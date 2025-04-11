let typeActuel = '';
let revenus = [];
let depenses = [];
let epargne = [];

// Fonction pour afficher le formulaire
function showForm(type) {
    typeActuel = type;
    document.getElementById('form-title').textContent =
        type === 'revenu' ? 'Ajouter un Revenu' :
        type === 'depense' ? 'Ajouter une Dépense' :
        'Ajouter une Epargne';
    document.getElementById('form-section').style.display = 'block';
}

// Fonction pour ajouter une transaction
// Fonction pour ajouter une transaction
function ajouterTransaction() {
    const montant = parseFloat(document.getElementById('montant').value);
    const nature = document.getElementById('nature').value.trim();

    // Validation des champs
    if (isNaN(montant) || montant <= 0 || nature === '') {
        alert("Veuillez entrer un montant valide (supérieur à 0) et une nature.");
        return;
    }

    const transaction = { montant, nature, type: typeActuel, date: new Date().toISOString() };

    // Ajout de la transaction dans la liste correspondante
    if (typeActuel === 'revenu') {
        revenus.push(transaction);
    } else if (typeActuel === 'depense') {
        depenses.push(transaction);
    } else if (typeActuel === 'epargne') {
        epargne.push(transaction); // Ajout dans l'espace épargne
    }

    // Mettre à jour l'interface après l'ajout de la transaction
    resetForm();
    updateUI(); // Mise à jour complète de l'interface
}



// Fonction pour réinitialiser le formulaire
function resetForm() {
    document.getElementById('montant').value = '';
    document.getElementById('nature').value = '';
    document.getElementById('form-section').style.display = 'none';
}

// Calculer les totaux
function calculerTotal(liste) {
    return liste.reduce((acc, curr) => acc + curr.montant, 0);
}

// Mise à jour de l'interface
// Mise à jour de l'interface utilisateur
function updateUI() {
    const totalRevenus = calculerTotal(revenus);
    const totalDepenses = calculerTotal(depenses);
    const totalEpargne = calculerTotal(epargne);
    const solde = totalRevenus - totalDepenses - totalEpargne;

    // Mise à jour des éléments HTML
    document.getElementById('solde').innerHTML = `💰 <strong>Solde Actuel</strong><br>${solde.toFixed(2)} DT`;
    document.getElementById('revenus').innerHTML = `📈 <strong>Revenus du Mois</strong><br>${totalRevenus.toFixed(2)} DT`;
    document.getElementById('depenses').innerHTML = `📉 <strong>Dépenses du Mois</strong><br>${totalDepenses.toFixed(2)} DT`;
    document.getElementById('epargne').innerHTML = `💵 <strong>Epargne</strong><br>${totalEpargne.toFixed(2)} DT`;

    // Mise à jour des graphiques et de la liste des transactions
    updateChart(totalRevenus, totalDepenses, totalEpargne);
    updateTransactionsList();
}


// Mettre à jour le graphique avec les nouvelles données
function updateChart(revenus, depenses, epargne) {
    miniChart.data.datasets[0].data = [revenus, depenses, epargne];
    miniChart.update();
}

// Fonction pour afficher les 5 dernières transactions
function updateTransactionsList() {
    const ul = document.getElementById('liste-transactions');
    ul.innerHTML = '';

    const allTransactions = [...revenus, ...depenses, ...epargne].sort((a, b) => new Date(b.date) - new Date(a.date));
    const last5 = allTransactions.slice(0, 5);

    last5.forEach(tr => {
        const li = document.createElement('li');
        li.textContent = `${tr.type === 'revenu' ? 'Revenu' : tr.type === 'depense' ? 'Dépense' : 'Epargne'} - ${tr.nature} : ${tr.montant.toFixed(2)} DT`;
        ul.appendChild(li);
    });
}

// Initialisation des données au chargement
function initialiserInformations() {
    // Réinitialisation des montants et des données à chaque visite
    revenus = [];
    depenses = [];
    epargne = [];
    updateUI();
}

// Vérifier le formulaire avant validation
function checkForm() {
    const montant = document.getElementById('montant').value;
    const nature = document.getElementById('nature').value.trim();
    const bouton = document.getElementById('valider-btn');

    bouton.disabled = isNaN(parseFloat(montant)) || montant <= 0 || nature === '';
}

// Lancer l'initialisation au chargement de la page
window.onload = initialiserInformations;
// Fonction pour initialiser les données au chargement de la page
function initialiserInformations() {
    // Réinitialisation des montants et des données à chaque visite
    revenus = [];
    depenses = [];
    epargne = [];
    
    // Mise à jour de l'interface utilisateur avec des valeurs par défaut
    updateUI();
}

// Vérifier le formulaire avant la validation
function checkForm() {
    const montant = document.getElementById('montant').value;
    const nature = document.getElementById('nature').value.trim();
    const bouton = document.getElementById('valider-btn');

    // Désactiver le bouton si les champs sont invalides
    bouton.disabled = isNaN(parseFloat(montant)) || montant <= 0 || nature === '';
}

// Configurer le graphique lors du chargement
let ctx = document.getElementById('miniChart').getContext('2d');
let miniChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Revenus', 'Dépenses', 'Epargne'],
        datasets: [{
            data: [0, 0, 0],
            backgroundColor: ['#4CAF50', '#FF6384', '#FFC107'],
            borderRadius: 5,
        }]
    },
    options: {
        responsive: true,
        plugins: { 
            legend: { display: false } 
        },
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// Mettre à jour le graphique
function updateChart(revenus, depenses, epargne) {
    miniChart.data.datasets[0].data = [revenus, depenses, epargne];
    miniChart.update();
}

// Initialiser les données au chargement de la page
window.onload = initialiserInformations;
