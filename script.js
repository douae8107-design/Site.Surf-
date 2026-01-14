// ============================================
// ÉCOLE DE SURF MAROC - SCRIPT PRINCIPAL
// ============================================

// Tableau des réservations
var allBookings = [];

// Prix en Dirhams Marocains
const COURSE_PRICES = {
    "débutant": 1000,      // 1,000 DH
    "intermédiaire": 1500, // 1,500 DH
    "prive": 3000          // 3,000 DH
};

// Calcul du prix total
function calculateTotalPrice(participants, courseType) {
    const unitPrice = COURSE_PRICES[courseType] || 0;
    return unitPrice * participants;
}

// Mettre à jour l'estimation du prix
function updatePriceEstimation() {
    const courseType = document.getElementById('courseType').value;
    const participants = parseInt(document.getElementById('participants').value) || 1;
    
    if (courseType) {
        const totalPrice = calculateTotalPrice(participants, courseType);
        document.getElementById('priceEstimation').innerHTML = 
            `<span class="estimated-price">${totalPrice.toLocaleString()} DH</span> pour ${participants} personne(s)`;
    } else {
        document.getElementById('priceEstimation').textContent = 
            "Sélectionnez un cours pour voir le prix";
    }
}

// Traiter la réservation
function processReservation() {
    console.log("Traitement de la réservation...");
    
    // Récupération des données du formulaire
    const clientName = document.getElementById('clientName').value.trim();
    const clientEmail = document.getElementById('clientEmail').value.trim();
    const courseType = document.getElementById('courseType').value;
    const courseDate = document.getElementById('courseDate').value;
    const participants = parseInt(document.getElementById('participants').value);
    
    // Validation des champs
    if (!clientName || !clientEmail || !courseType || !courseDate) {
        alert("⚠️ Veuillez remplir tous les champs obligatoires !");
        return;
    }
    
    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientEmail)) {
        alert("⚠️ Veuillez entrer une adresse email valide !");
        return;
    }
    
    // Calcul du prix
    const totalPrice = calculateTotalPrice(participants, courseType);
    
    // Création de l'objet réservation
    const newBooking = {
        id: Date.now(),
        name: clientName,
        email: clientEmail,
        course: courseType,
        date: courseDate,
        participants: participants,
        price: totalPrice,
        status: "Confirmée",
        bookingDate: new Date().toLocaleString('fr-MA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };
    
    // Ajout au tableau
    allBookings.push(newBooking);
    console.log("✅ Réservation ajoutée :", newBooking);
    
    // Affichage de la confirmation
    displayConfirmation(newBooking);
    
    // Mise à jour de l'affichage
    updateBookingsDisplay();
    updateStatistics();
    
    // Réinitialisation du formulaire
    document.getElementById('reservationForm').reset();
    updatePriceEstimation();
    
    // Sauvegarde locale
    saveToLocalStorage();
}

// Afficher la confirmation
function displayConfirmation(booking) {
    const confirmationDiv = document.getElementById('confirmationMessage');
    const detailsDiv = document.getElementById('reservationDetails');
    const priceDiv = document.getElementById('totalPrice');
    
    // Formatage de la date
    const formattedDate = new Date(booking.date).toLocaleDateString('fr-MA', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Détails de la réservation
    detailsDiv.innerHTML = `
        <div class="booking-details">
            <p><strong>👤 Client :</strong> ${booking.name}</p>
            <p><strong>📧
