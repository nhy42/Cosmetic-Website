function ajouterAvis(event) {
    event.preventDefault(); // Empêcher le rechargement de la page
  
    // Récupérer les valeurs des champs de saisie
    const produits = Array.from(document.querySelectorAll('input[name="produits"]:checked')).map(input => input.value);
    const dateCommande = document.getElementById('orderDate').value;
    const noteLivraison = document.getElementById('deliveryGrade').value;
    const noteQualite = document.getElementById('qualityGrade').value;
    const noteService = document.getElementById('serviceGrade').value;
    const noteRapidite = document.getElementById('speedGrade').value;
    const commentaire = document.getElementById('comment').value;
  
    // Créer une nouvelle ligne dans le tableau
    const table = document.getElementById('table_id');
    const row = table.insertRow(-1);
    const produitsCell = row.insertCell(0);
    const dateCommandeCell = row.insertCell(1);
    const noteLivraisonCell = row.insertCell(2);
    const noteQualiteCell = row.insertCell(3);
    const noteServiceCell = row.insertCell(4);
    const noteRapiditeCell = row.insertCell(5);
    const commentaireCell = row.insertCell(6);
  
    // Remplir les cellules avec les valeurs saisies
    produitsCell.textContent = produits.join(', ');
    dateCommandeCell.textContent = dateCommande;
    noteLivraisonCell.textContent = noteLivraison;
    noteQualiteCell.textContent = noteQualite;
    noteServiceCell.textContent = noteService;
    noteRapiditeCell.textContent = noteRapidite;
    commentaireCell.textContent = commentaire;
  
    // Réinitialiser les champs de saisie
     document.getElementById('avisForm').reset();
  }

  



