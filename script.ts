function calculateAge(): void {
    const dobInput = (document.getElementById("dob") as HTMLInputElement).value;
    const resultElement = document.getElementById("result") as HTMLElement;
    
    if (!dobInput) {
        showAlert("Please enter your date of birth.");
        return;
    }
    
    const dob: Date = new Date(dobInput);
    const today: Date = new Date();
    
    if (dob > today) {
        showAlert("Future date is not valid!");
        return;
    }
    
    // Add loading animation
    resultElement.classList.add("loading");
    resultElement.innerHTML = "Calculating...";
    resultElement.classList.add("show");
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
        let years: number = today.getFullYear() - dob.getFullYear();
        let months: number = today.getMonth() - dob.getMonth();
        let days: number = today.getDate() - dob.getDate();
        
        if (days < 0) {
            months--;
            const previousMonthDays: number = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            days += previousMonthDays;
        }
        
        if (months < 0) {
            years--;
            months += 12;
        }
        
        // Create better formatted result
        const resultHTML: string = `
            <div class="result-text">Aap ki umar hai:</div>
            <div class="age-display">
                <div class="age-item">
                    <div class="age-number">${years}</div>
                    <div class="age-label">Saal</div>
                </div>
                <div class="age-item">
                    <div class="age-number">${months}</div>
                    <div class="age-label">Mahine</div>
                </div>
                <div class="age-item">
                    <div class="age-number">${days}</div>
                    <div class="age-label">Din</div>
                </div>
            </div>
        `;
        
        resultElement.classList.remove("loading");
        resultElement.innerHTML = resultHTML;
        
        // Add celebration animation
        createCelebration();
    }, 800);
}

function showAlert(message: string): void {
    // Create custom alert
    const alertDiv: HTMLDivElement = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #ff6b6b, #ee5a24);
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(255, 107, 107, 0.3);
        z-index: 1000;
        font-weight: 600;
        animation: slideDown 0.3s ease-out;
    `;
    alertDiv.textContent = message;
    
    // Add slide down animation
    const style: HTMLStyleElement = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.animation = 'slideDown 0.3s ease-out reverse';
        setTimeout(() => {
            if (document.body.contains(alertDiv)) {
                document.body.removeChild(alertDiv);
            }
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
        }, 300);
    }, 3000);
}

function createCelebration(): void {
    const colors: string[] = ['#667eea', '#764ba2', '#ff6b6b', '#4ecdc4', '#45b7d1'];
    
    for (let i: number = 0; i < 15; i++) {
        setTimeout(() => {
            const confetti: HTMLDivElement = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}vw;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: confettiFall 3s linear forwards;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (document.body.contains(confetti)) {
                    document.body.removeChild(confetti);
                }
            }, 3000);
        }, i * 100);
    }
    
    // Add confetti animation
    if (!document.getElementById('confetti-style')) {
        const style: HTMLStyleElement = document.createElement('style');
        style.id = 'confetti-style';
        style.textContent = `
            @keyframes confettiFall {
                to {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Add input animation on page load
document.addEventListener('DOMContentLoaded', (): void => {
    const input = document.getElementById('dob') as HTMLInputElement;
    
    input.addEventListener('focus', (): void => {
        input.parentElement?.classList.add('focused');
    });
    
    input.addEventListener('blur', (): void => {
        input.parentElement?.classList.remove('focused');
    });
});