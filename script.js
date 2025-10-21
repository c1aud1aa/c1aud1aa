const I18N = {
    it: {
        name: 'Claudia Stefanelli',
        common: {
            open: '→',
            openLabel: 'Apri'
        },
        cardio: {
            title: 'Cardiologia',
            desc: 'Assistenza al paziente cardiopatico, gestione parametri vitali, ECG di base, educazione sanitaria.',
            modalTitle: 'Tirocinio in Cardiologia',
            modalText: 'Attività principali svolte:',
            bullets: [
                'Monitoraggio parametri e gestione early warning scores',
                'Esecuzione ECG di base e interpretazione preliminare',
                'Educazione alla terapia e stili di vita',
            ],
        },
        surgery: {
            title: 'Chirurgia Generale',
            desc: 'Medicazioni, gestione drenaggi, preparazione pre-operatoria, controllo dolore post-operatorio.',
            modalTitle: 'Tirocinio in Chirurgia Generale',
            modalText: 'Competenze acquisite:',
            bullets: [
                'Tecniche di medicazione e gestione ferite',
                'Gestione drenaggi e prevenzione complicanze',
                'Analgesia e scale del dolore',
            ],
        },
        hematology: {
            title: 'Ematologia',
            desc: 'Prelievi venosi, emocomponenti, prevenzione infezioni, supporto a pazienti in terapia.',
            modalTitle: 'Tirocinio in Ematologia',
            modalText: 'Attività principali:',
            bullets: [
                'Prelievi venosi ed emocolture in asepsi',
                'Gestione e trasfusione di emocomponenti',
                'Educazione alla prevenzione delle infezioni',
            ],
        },
        genetics: {
            title: 'Genetica/Day Hospital',
            desc: 'Accoglienza, raccolta anamnestica, counselling di base, follow-up ambulatoriale.',
            modalTitle: 'Tirocinio in Genetica / Day Hospital',
            modalText: 'Cosa ho fatto:',
            bullets: [
                'Accoglienza e triage infermieristico',
                'Raccolta dati e anamnesi infermieristica',
                'Follow-up e gestione appuntamenti',
            ],
        },
    },
    en: {
        name: 'Claudia Stefanelli',
        common: {
            open: '→',
            openLabel: 'Open'
        },
        cardio: {
            title: 'Cardiology',
            desc: 'Cardiac patient care, vital signs, basic ECG, health education.',
            modalTitle: 'Internship in Cardiology',
            modalText: 'Main activities performed:',
            bullets: [
                'Monitoring vitals and early warning scores',
                'Basic ECG execution and preliminary reading',
                'Therapy education and lifestyle counselling',
            ],
        },
        surgery: {
            title: 'General Surgery',
            desc: 'Dressings, drain management, pre-op preparation, post-op pain control.',
            modalTitle: 'Internship in General Surgery',
            modalText: 'Skills gained:',
            bullets: [
                'Wound care and dressing techniques',
                'Drain management and complication prevention',
                'Analgesia and pain scales',
            ],
        },
        hematology: {
            title: 'Hematology',
            desc: 'Venipuncture, blood components, infection prevention, therapy support.',
            modalTitle: 'Internship in Hematology',
            modalText: 'Key activities:',
            bullets: [
                'Venipuncture and blood cultures with asepsis',
                'Handling and transfusion of blood components',
                'Education on infection prevention',
            ],
        },
        genetics: {
            title: 'Genetics/Day Hospital',
            desc: 'Reception, history taking, basic counselling, outpatient follow-up.',
            modalTitle: 'Internship in Genetics / Day Hospital',
            modalText: 'What I did:',
            bullets: [
                'Reception and nursing triage',
                'Data collection and nursing history',
                'Follow-up and appointment management',
            ],
        },
    }
};


let currentLang = 'it';

const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function applyLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    const dict = I18N[lang];

    document.getElementById('student-name').textContent = dict.name;
    document.getElementById('footer-name').textContent = dict.name;

    $$('.lang-btn').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang));

    $$('.card').forEach(card => {
        const id = card.dataset.id;
        card.querySelector('.card-title').textContent = dict[id].title;
        card.querySelector('.card-desc').textContent = dict[id].desc;
        const openBtn = card.querySelector('.card-open');
        if (openBtn.querySelector('img')) {

            openBtn.setAttribute('aria-label', `${dict[id].title} — ${dict.common.openLabel}`);
        } else {

            openBtn.textContent = dict.common.openLabel || dict.common.open;
        }
    });
}


const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const modalList = document.getElementById('modal-list');

function openModal(cardId) {
    const d = I18N[currentLang][cardId];
    modalTitle.textContent = d.modalTitle;
    modalText.textContent = d.modalText;
    modalList.innerHTML = d.bullets.map(item => `<li>${item}</li>`).join('');
    modal.dataset.open = 'true';
    modal.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.dataset.open = 'false';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Eventi
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.card-open');
    if (btn) {
        const card = btn.closest('.card');
        openModal(card.dataset.id);
    }
    if (e.target.closest('.modal-close')) {
        closeModal();
    }
    if (e.target.classList.contains('modal-backdrop')) {
        closeModal();
    }
    const langBtn = e.target.closest('.lang-btn');
    if (langBtn) {
        applyLang(langBtn.dataset.lang);
    }
});


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.dataset.open === 'true') closeModal();
});


document.getElementById('year').textContent = new Date().getFullYear();
applyLang('it');


document.addEventListener('contextmenu', (e) => {
    if (e.target.matches('img, .profile-pic, .flag-icon, .icon-arrow, .icon-close')) {
        e.preventDefault();
    }
});


document.addEventListener('touchstart', (e) => {
    if (e.target.matches('img, .profile-pic, .flag-icon, .icon-arrow, .icon-close')) {
        clearTimeout(window._pressTimer);
        window._pressTimer = setTimeout(() => e.preventDefault(), 200);
    }
});

document.addEventListener('touchend', () => clearTimeout(window._pressTimer));