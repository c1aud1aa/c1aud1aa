// Tirocini clinici: per ogni reparto, attività svolte (a) e competenze acquisite (s), in IT ed EN.
// L'ordine segue la griglia del sito; "area" sceglie etichetta e tinta della card.

export const TIROCINI = [
  {
    id: 'terapia',
    area: 'critical',
    it: {
      t: 'Terapia Intensiva di Cardiochirurgia',
      a: [
        'Monitoraggio continuo dei parametri vitali e dei presidi invasivi',
        'Utilizzo in affiancamento di ventilatori, drenaggi toracici e CVC',
        'Partecipazione al controllo del bilancio idrico e alla prevenzione delle infezioni',
        'Supporto nella gestione del paziente sedato o in svezzamento dalla ventilazione',
        'Estubazione',
        'Utilizzo del dializzatore HFR (doppia camera)',
        'Osservazione durante manovre di rianimazione cardiopolmonare, intubazione, applicazione dell’ECMO e rimozione del LUCAS',
        'Esecuzione di emogasanalisi',
        'Broncoaspirazione da tracheostomia',
        'Posizionamento e rimozione del sondino nasogastrico (SNG)',
      ],
      s: [
        'Analisi dei dati emodinamici per la valutazione dello stato clinico',
        'Riconoscimento precoce di alterazioni respiratorie o circolatorie',
        'Applicazione del ragionamento clinico per la priorità assistenziale e la sicurezza del paziente',
      ],
    },
    en: {
      t: 'Cardiac Surgery Intensive Care',
      a: [
        'Continuous monitoring of vital signs and invasive devices',
        'Supervised use of ventilators, chest drains and CVCs',
        'Fluid balance monitoring and infection prevention',
        'Supporting sedated patients and weaning from mechanical ventilation',
        'Extubation',
        'Use of the HFR dialyser (double chamber)',
        'Observing CPR, intubation, ECMO initiation and LUCAS removal',
        'Arterial blood gas analysis',
        'Tracheostomy suctioning',
        'Nasogastric tube insertion and removal',
      ],
      s: [
        'Analysing haemodynamic data to assess clinical status',
        'Early recognition of respiratory or circulatory changes',
        'Clinical reasoning to set care priorities and protect patient safety',
      ],
    },
  },
  {
    id: 'impianto',
    area: 'vascular',
    it: {
      t: 'Impianto di PICC e Midline',
      a: [
        'Osservazione e supporto durante l’impianto di cateteri venosi centrali a inserimento periferico (PICC) e Midline',
        'Preparazione del materiale sterile e allestimento del campo procedurale',
        'Collaborazione nella valutazione del calibro venoso e nella scelta del sito di inserzione',
        'Applicazione dei protocolli di asepsi e delle procedure di sicurezza',
        'Monitoraggio del paziente durante e dopo la procedura',
        'Partecipazione alla medicazione e alla manutenzione del catetere (flush, cambio valvole, fissaggio, bendaggio)',
        'Educazione del paziente alla gestione del dispositivo e alla prevenzione delle infezioni',
      ],
      s: [
        'Comprensione dell’anatomia venosa e dei criteri di scelta del dispositivo (PICC o Midline)',
        'Riconoscimento delle complicanze immediate (malposizionamento, sanguinamento, reazioni vagali) e tardive (flebite, infezioni, ostruzioni)',
        'Ragionamento clinico nella scelta dell’accesso venoso più appropriato in base a terapia, durata del trattamento e condizioni del paziente',
        'Gestione sterile e prevenzione delle infezioni correlate ai cateteri venosi centrali (CLABSI)',
        'Attenzione ai dettagli e capacità di lavorare in un contesto ad alta responsabilità',
      ],
    },
    en: {
      t: 'PICC and Midline Placement',
      a: [
        'Observing and assisting with the placement of peripherally inserted central catheters (PICC) and Midlines',
        'Preparing sterile equipment and setting up the procedural field',
        'Helping assess vein calibre and choose the insertion site',
        'Applying aseptic protocols and safety procedures',
        'Monitoring the patient during and after the procedure',
        'Catheter dressing and maintenance (flushing, valve changes, securement, bandaging)',
        'Educating patients on device care and infection prevention',
      ],
      s: [
        'Understanding of venous anatomy and device selection criteria (PICC or Midline)',
        'Recognising immediate complications (malposition, bleeding, vagal reactions) and late ones (phlebitis, infection, occlusion)',
        'Clinical reasoning to choose the most appropriate venous access for the therapy, its duration and the patient’s condition',
        'Sterile technique and prevention of central line-associated bloodstream infections (CLABSI)',
        'Attention to detail and the ability to work in a high-responsibility setting',
      ],
    },
  },
  {
    id: 'day',
    area: 'onco',
    it: {
      t: 'Day Hospital Oncologico',
      a: [
        'Accoglienza dei pazienti in trattamento chemioterapico',
        'Preparazione del materiale e gestione di PICC e PICC-PORT',
        'Inserimento di aghi di Huber',
        'Somministrazione delle terapie antitumorali',
        'Educazione sanitaria su effetti collaterali e igiene domiciliare',
      ],
      s: [
        'Valutazione delle reazioni avverse ai farmaci e dei segni di tossicità',
        'Pianificazione dell’assistenza in base allo stato clinico e alla tolleranza alla terapia',
        'Ragionamento clinico orientato alla sicurezza, al comfort e al sostegno psicologico',
      ],
    },
    en: {
      t: 'Oncology Day Hospital',
      a: [
        'Welcoming patients undergoing chemotherapy',
        'Preparing equipment and managing PICC and PICC-port devices',
        'Inserting Huber needles',
        'Administering anticancer therapies',
        'Health education on side effects and hygiene at home',
      ],
      s: [
        'Assessing adverse drug reactions and signs of toxicity',
        'Care planning based on clinical status and treatment tolerance',
        'Clinical reasoning focused on safety, comfort and psychological support',
      ],
    },
  },
  {
    id: 'centro',
    area: 'critical',
    it: {
      t: 'Centro Grandi Ustionati',
      a: [
        'Esecuzione di medicazioni avanzate e gestione del dolore',
        'Monitoraggio dei liquidi, dell’equilibrio idro-elettrolitico e dei segni di infezione',
        'Supporto psicologico al paziente in fase acuta e riabilitativa',
        'Applicazione di procedure di asepsi e isolamento protettivo',
      ],
      s: [
        'Valutazione della profondità e dell’estensione delle lesioni',
        'Identificazione dei bisogni prioritari (idratazione, termoregolazione, comfort)',
        'Ragionamento clinico basato sulla gestione integrata del trauma e della guarigione tessutale',
      ],
    },
    en: {
      t: 'Major Burns Centre',
      a: [
        'Advanced wound dressings and pain management',
        'Monitoring fluids, electrolyte balance and signs of infection',
        'Psychological support in the acute and rehabilitation phases',
        'Aseptic procedures and protective isolation',
      ],
      s: [
        'Assessing the depth and extent of burns',
        'Identifying priority needs (hydration, thermoregulation, comfort)',
        'Clinical reasoning for integrated management of trauma and wound healing',
      ],
    },
  },
  {
    id: 'cardio',
    area: 'medicine',
    it: {
      t: 'Cardiologia',
      a: [
        'Monitoraggio di ECG, pressione arteriosa e frequenza cardiaca',
        'Somministrazione di terapie in pazienti con aritmie o scompenso cardiaco',
        'Assistenza durante esami diagnostici e procedure invasive',
        'Educazione del paziente alla gestione della terapia e dello stile di vita (attività fisica, alimentazione)',
      ],
      s: [
        'Interpretazione dei parametri vitali per individuare segni di instabilità emodinamica',
        'Correlazione tra sintomi, terapia e risposta clinica',
        'Pianificazione dell’assistenza mirata alla stabilizzazione del quadro cardiocircolatorio',
      ],
    },
    en: {
      t: 'Cardiology',
      a: [
        'Monitoring ECG, blood pressure and heart rate',
        'Administering therapy to patients with arrhythmias or heart failure',
        'Assisting during diagnostic tests and invasive procedures',
        'Educating patients on medication and lifestyle (physical activity, diet)',
      ],
      s: [
        'Interpreting vital signs to detect haemodynamic instability',
        'Linking symptoms, therapy and clinical response',
        'Care planning aimed at cardiovascular stability',
      ],
    },
  },
  {
    id: 'chirurgia',
    area: 'surgery',
    it: {
      t: 'Chirurgia Vascolare',
      a: [
        'Preparazione del campo sterile e assistenza post-operatoria',
        'Monitoraggio della perfusione periferica e delle ferite chirurgiche',
        'Gestione dei drenaggi e somministrazione della terapia farmacologica',
        'Educazione del paziente alla mobilità e alla prevenzione delle trombosi',
      ],
      s: [
        'Osservazione dei segni di ischemia, emorragia o infezione',
        'Valutazione della risposta alla terapia',
        'Ragionamento clinico volto alla prevenzione delle complicanze vascolari',
      ],
    },
    en: {
      t: 'Vascular Surgery',
      a: [
        'Preparing the sterile field and providing post-operative care',
        'Monitoring peripheral perfusion and surgical wounds',
        'Managing drains and administering medication',
        'Educating patients on mobility and thrombosis prevention',
      ],
      s: [
        'Spotting signs of ischaemia, haemorrhage or infection',
        'Evaluating the response to therapy',
        'Clinical reasoning aimed at preventing vascular complications',
      ],
    },
  },
  {
    id: 'ortopedia',
    area: 'surgery',
    it: {
      t: 'Ortopedia',
      a: [
        'Assistenza ai pazienti nel post-operatorio (protesi, fratture, artroscopie)',
        'Gestione di drenaggi, cateteri e medicazioni chirurgiche',
        'Monitoraggio del dolore, della mobilità e dei parametri vitali',
        'Educazione del paziente alla mobilizzazione e alla prevenzione delle lesioni da pressione',
      ],
      s: [
        'Valutazione del rischio di complicanze post-operatorie (trombosi, infezioni, cadute)',
        'Analisi dei segni locali di infezione e pianificazione dell’intervento infermieristico',
        'Ragionamento clinico orientato al recupero funzionale e all’autonomia del paziente',
      ],
    },
    en: {
      t: 'Orthopaedics',
      a: [
        'Post-operative care (joint replacements, fractures, arthroscopies)',
        'Managing drains, catheters and surgical dressings',
        'Monitoring pain, mobility and vital signs',
        'Educating patients on mobilisation and pressure ulcer prevention',
      ],
      s: [
        'Assessing the risk of post-operative complications (thrombosis, infection, falls)',
        'Recognising local signs of infection and planning nursing interventions',
        'Clinical reasoning focused on functional recovery and patient independence',
      ],
    },
  },
  {
    id: 'fisiopatologia',
    area: 'medicine',
    it: {
      t: 'Fisiopatologia Respiratoria',
      a: [
        'Osservazione delle prove di funzionalità respiratoria',
        'Assistenza a pazienti con BPCO e insufficienza respiratoria',
        'Educazione all’uso dei dispositivi inalatori e alla respirazione controllata',
        'Supporto nella gestione dell’ossigenoterapia',
        'Broncoaspirazione da tracheostomia',
      ],
      s: [
        'Analisi dei dati spirometrici e correlazione con il quadro clinico del paziente',
        'Valutazione della tolleranza allo sforzo e della risposta alla terapia',
        'Ragionamento clinico orientato alla gestione dell’insufficienza respiratoria cronica',
      ],
    },
    en: {
      t: 'Respiratory Pathophysiology',
      a: [
        'Observing pulmonary function tests',
        'Caring for patients with COPD and respiratory failure',
        'Teaching inhaler technique and controlled breathing',
        'Supporting oxygen therapy management',
        'Tracheostomy suctioning',
      ],
      s: [
        'Interpreting spirometry and relating it to the patient’s condition',
        'Assessing exercise tolerance and response to therapy',
        'Clinical reasoning for managing chronic respiratory failure',
      ],
    },
  },
  {
    id: 'nefrologia',
    area: 'peds',
    it: {
      t: 'Nefrologia Pediatrica',
      a: [
        'Assistenza a bambini con insufficienza renale acuta e cronica',
        'Supporto durante dialisi peritoneale o emodialisi',
        'Monitoraggio dei parametri vitali e del bilancio idrico',
        'Coinvolgimento della famiglia nell’assistenza quotidiana',
      ],
      s: [
        'Valutazione dei segni di squilibrio idro-elettrolitico',
        'Ragionamento clinico su peso, diuresi e parametri ematici',
        'Approccio relazionale e comunicativo adeguato all’età pediatrica',
      ],
    },
    en: {
      t: 'Paediatric Nephrology',
      a: [
        'Caring for children with acute and chronic kidney failure',
        'Assisting during peritoneal dialysis and haemodialysis',
        'Monitoring vital signs and fluid balance',
        'Involving families in daily care',
      ],
      s: [
        'Recognising signs of fluid and electrolyte imbalance',
        'Clinical reasoning on weight, urine output and blood values',
        'Age-appropriate communication with children',
      ],
    },
  },
  {
    id: 'psichiatria',
    area: 'mental',
    it: {
      t: 'Psichiatria',
      a: [
        'Osservazione e supporto ai pazienti con disturbi psichiatrici acuti e cronici',
        'Somministrazione di terapie farmacologiche',
        'Partecipazione ad attività riabilitative e colloqui terapeutici',
        'Gestione di situazioni di agitazione o crisi comportamentale',
      ],
      s: [
        'Valutazione del comportamento e del rischio auto/eterolesivo',
        'Riconoscimento dei bisogni emotivi e relazionali del paziente',
        'Ragionamento clinico orientato alla sicurezza e alla continuità terapeutica',
      ],
    },
    en: {
      t: 'Psychiatry',
      a: [
        'Observing and supporting patients with acute and chronic psychiatric disorders',
        'Administering medication',
        'Taking part in rehabilitation activities and therapeutic interviews',
        'Managing agitation and behavioural crises',
      ],
      s: [
        'Assessing behaviour and the risk of harm to self or others',
        'Recognising patients’ emotional and relational needs',
        'Clinical reasoning focused on safety and continuity of care',
      ],
    },
  },
  {
    id: 'comunita',
    area: 'mental',
    it: {
      t: 'Comunità Terapeutica Protetta',
      a: [
        'Supporto nelle attività quotidiane e riabilitative degli ospiti',
        'Osservazione dei progressi comportamentali e relazionali',
        'Collaborazione con educatori e psicologi',
        'Somministrazione di terapie e partecipazione a riunioni d’équipe',
      ],
      s: [
        'Valutazione dell’autonomia e della risposta al piano terapeutico',
        'Ragionamento clinico centrato sulla relazione d’aiuto e sul reinserimento sociale',
        'Sviluppo di competenze comunicative e di gestione dei conflitti',
      ],
    },
    en: {
      t: 'Supported Therapeutic Community',
      a: [
        'Supporting residents in daily and rehabilitation activities',
        'Observing behavioural and relational progress',
        'Working alongside educators and psychologists',
        'Administering medication and taking part in team meetings',
      ],
      s: [
        'Assessing independence and response to the care plan',
        'Clinical reasoning centred on the helping relationship and social reintegration',
        'Communication and conflict-management skills',
      ],
    },
  },
  {
    id: 'assistenza',
    area: 'community',
    it: {
      t: 'Assistenza Domiciliare',
      a: [
        'Monitoraggio dei parametri vitali e somministrazione di terapie a domicilio (orali, ipodermoclisi, topiche, cateteri centrali inseriti per via periferica)',
        'Gestione di cateteri, stomie e medicazioni croniche',
        'Esecuzione di prelievi venosi',
        'Educazione sanitaria e supporto al caregiver',
        'Documentazione e continuità assistenziale tra ospedale e territorio',
      ],
      s: [
        'Valutazione globale del paziente nel contesto familiare',
        'Pianificazione personalizzata dell’assistenza infermieristica',
        'Ragionamento clinico orientato alla prevenzione e al mantenimento dell’autonomia del paziente',
      ],
    },
    en: {
      t: 'Home Care',
      a: [
        'Monitoring vital signs and giving therapies at home (oral, hypodermoclysis, topical, via PICC)',
        'Managing catheters, stomas and chronic wound dressings',
        'Venous blood sampling',
        'Health education and caregiver support',
        'Documentation and continuity of care between hospital and community',
      ],
      s: [
        'Holistic assessment of the patient within the family',
        'Personalised nursing care planning',
        'Clinical reasoning focused on prevention and preserving the patient’s independence',
      ],
    },
  },
  {
    id: 'punto',
    area: 'lab',
    it: {
      t: 'Punto Prelievi',
      a: [
        'Esecuzione di prelievi venosi',
        'Identificazione del paziente e preparazione del materiale sterile',
        'Conservazione e trasporto corretto dei campioni biologici',
        'Gestione del paziente con difficoltà vascolari o ansia',
      ],
      s: [
        'Valutazione delle condizioni venose e scelta del sito di prelievo',
        'Applicazione di tecniche di asepsi e prevenzione delle complicanze locali',
        'Ragionamento clinico basato sulla sicurezza e sull’appropriatezza procedurale',
      ],
    },
    en: {
      t: 'Blood Collection Centre',
      a: [
        'Venous blood sampling',
        'Patient identification and sterile equipment preparation',
        'Correct storage and transport of biological samples',
        'Managing patients with difficult veins or anxiety',
      ],
      s: [
        'Assessing veins and choosing the puncture site',
        'Aseptic technique and prevention of local complications',
        'Clinical reasoning based on safety and procedural appropriateness',
      ],
    },
  },
  {
    id: 'blsd',
    area: 'emergency',
    it: {
      t: 'Corso BLSD',
      a: [
        'Partecipazione al corso teorico-pratico di rianimazione cardiopolmonare di base e defibrillazione (BLSD)',
        'Addestramento alle manovre di rianimazione su adulto, bambino e lattante',
        'Utilizzo del defibrillatore semiautomatico esterno (DAE) secondo le linee guida IRC',
        'Simulazioni di emergenze intraospedaliere e territoriali',
        'Gestione della catena della sopravvivenza in caso di arresto cardiaco',
        'Addestramento al riconoscimento precoce dell’arresto cardiorespiratorio e all’attivazione del sistema di emergenza',
      ],
      s: [
        'Capacità di riconoscere rapidamente le condizioni di emergenza vitale',
        'Ragionamento clinico in contesto critico, con priorità alla sicurezza personale e del paziente e alla tempestività dell’intervento',
        'Padronanza delle tecniche di compressione toracica e ventilazione di soccorso',
        'Utilizzo corretto del DAE',
        'Autocontrollo, lavoro di squadra e comunicazione efficace nella gestione delle emergenze',
      ],
    },
    en: {
      t: 'BLSD Course',
      a: [
        'Theory and practical course in basic life support and defibrillation (BLSD)',
        'Resuscitation training on adults, children and infants',
        'Using an automated external defibrillator (AED) according to IRC guidelines',
        'In-hospital and out-of-hospital emergency simulations',
        'Managing the chain of survival in cardiac arrest',
        'Training in early recognition of cardiac arrest and activation of the emergency system',
      ],
      s: [
        'Rapid recognition of life-threatening emergencies',
        'Clinical reasoning under pressure, prioritising personal and patient safety and timely action',
        'Proficiency in chest compressions and rescue breaths',
        'Correct use of the AED',
        'Composure, teamwork and clear communication in emergencies',
      ],
    },
  },
];
