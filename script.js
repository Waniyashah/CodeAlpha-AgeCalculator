function calculateAge() {
    var dobInput = document.getElementById("dob").value;
    var resultElement = document.getElementById("result");
    if (!dobInput) {
        showAlert("Please enter your date of birth.");
        return;
    }
    var dob = new Date(dobInput);
    var today = new Date();
    if (dob > today) {
        showAlert("Future date is not valid!");
        return;
    }
    // Add loading animation
    resultElement.classList.add("loading");
    resultElement.innerHTML = "Calculating...";
    resultElement.classList.add("show");
    // Simulate calculation delay for better UX
    setTimeout(function () {
        var years = today.getFullYear() - dob.getFullYear();
        var months = today.getMonth() - dob.getMonth();
        var days = today.getDate() - dob.getDate();
        if (days < 0) {
            months--;
            var previousMonthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            days += previousMonthDays;
        }
        if (months < 0) {
            years--;
            months += 12;
        }
        var result = "Aap ki umar hai: <strong>".concat(years, "</strong> saal, <strong>").concat(months, "</strong> mahine, aur <strong>").concat(days, "</strong> din.");
        resultElement.classList.remove("loading");
        resultElement.innerHTML = result;
        // Add celebration animation
        createCelebration();
    }, 800);
}
function showAlert(message) {
    // Create custom alert
    var alertDiv = document.createElement('div');
    alertDiv.style.cssText = "\n        position: fixed;\n        top: 20px;\n        left: 50%;\n        transform: translateX(-50%);\n        background: linear-gradient(135deg, #ff6b6b, #ee5a24);\n        color: white;\n        padding: 15px 25px;\n        border-radius: 12px;\n        box-shadow: 0 10px 25px rgba(255, 107, 107, 0.3);\n        z-index: 1000;\n        font-weight: 600;\n        animation: slideDown 0.3s ease-out;\n    ";
    alertDiv.textContent = message;
    // Add slide down animation
    var style = document.createElement('style');
    style.textContent = "\n        @keyframes slideDown {\n            from {\n                opacity: 0;\n                transform: translateX(-50%) translateY(-20px);\n            }\n            to {\n                opacity: 1;\n                transform: translateX(-50%) translateY(0);\n            }\n        }\n    ";
    document.head.appendChild(style);
    document.body.appendChild(alertDiv);
    setTimeout(function () {
        alertDiv.style.animation = 'slideDown 0.3s ease-out reverse';
        setTimeout(function () {
            if (document.body.contains(alertDiv)) {
                document.body.removeChild(alertDiv);
            }
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
        }, 300);
    }, 3000);
}
function createCelebration() {
    var colors = ['#667eea', '#764ba2', '#ff6b6b', '#4ecdc4', '#45b7d1'];
    for (var i = 0; i < 15; i++) {
        setTimeout(function () {
            var confetti = document.createElement('div');
            confetti.style.cssText = "\n                position: fixed;\n                width: 10px;\n                height: 10px;\n                background: ".concat(colors[Math.floor(Math.random() * colors.length)], ";\n                top: -10px;\n                left: ").concat(Math.random() * 100, "vw;\n                border-radius: 50%;\n                pointer-events: none;\n                z-index: 1000;\n                animation: confettiFall 3s linear forwards;\n            ");
            document.body.appendChild(confetti);
            setTimeout(function () {
                if (document.body.contains(confetti)) {
                    document.body.removeChild(confetti);
                }
            }, 3000);
        }, i * 100);
    }
    // Add confetti animation
    if (!document.getElementById('confetti-style')) {
        var style = document.createElement('style');
        style.id = 'confetti-style';
        style.textContent = "\n            @keyframes confettiFall {\n                to {\n                    transform: translateY(100vh) rotate(720deg);\n                    opacity: 0;\n                }\n            }\n        ";
        document.head.appendChild(style);
    }
}
// Add input animation on page load
document.addEventListener('DOMContentLoaded', function () {
    var input = document.getElementById('dob');
    input.addEventListener('focus', function () {
        var _a;
        (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add('focused');
    });
    input.addEventListener('blur', function () {
        var _a;
        (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.classList.remove('focused');
    });
});
// Alternative function with interface (optional enhancement)
function calculateAgeWithInterface(dobString) {
    if (!dobString) {
        return null;
    }
    var dob = new Date(dobString);
    var today = new Date();
    if (dob > today) {
        return null;
    }
    var years = today.getFullYear() - dob.getFullYear();
    var months = today.getMonth() - dob.getMonth();
    var days = today.getDate() - dob.getDate();
    if (days < 0) {
        months--;
        var previousMonthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        days += previousMonthDays;
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    return { years: years, months: months, days: days };
}
