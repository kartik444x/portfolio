/**
 * PORTFOLIO DATA CONFIGURATION
 * ------------------------------------------------------------------
 * Configured for: KARTIK
 * Machine Learning Engineer & Python Developer
 * (Focus: Python, ML, NLP, Data Science)
 */

const PORTFOLIO_DATA = {
  personal: {
    name: "Kartik",
    roleTitle: "Machine Learning Engineer & Python Developer",
    rotatingTitles: [
      "Machine Learning Engineer",
      "Python Developer",
      "NLP & Text Classification Specialist",
      "Data Science & Predictive Modeler",
      "Problem Solver & Algorithm Enthusiast"
    ],
    status: {
      isAvailable: true,
      text: "Open to Machine Learning & Python Opportunities"
    },
    location: "India / Remote Friendly",
    phone: "+91 7740071864",
    phoneDisplay: "+91 7740071864",
    whatsappUrl: "https://wa.me/917740071864?text=Hi%20Kartik,%20I%20viewed%20your%20ML%20portfolio%20and%20would%20like%20to%20connect!",
    email: "kartikota44@gmail.com",
    github: "https://github.com/kartik444x",
    linkedin: "https://www.linkedin.com/in/kartik-choudhary-b73078349",
    twitter: "https://twitter.com",
    resumeUrl: "mailto:kartikota44@gmail.com",
    bioShort: "I build intelligent machine learning pipelines and natural language processing models in Python. Focused on exploratory data analysis, feature engineering, and high-precision text classification.",
    bioLong: `I am Kartik, a passionate Machine Learning Engineer and Python Developer. My expertise centers around machine learning algorithms, natural language processing (NLP), data preprocessing, and exploratory data analysis (EDA).
    
    I develop models that solve real-world analytical problems—such as designing recommendation systems (Starbucks AI) and building robust NLP classifiers (Spam vs Ham). I pride myself on deep understanding of model evaluation metrics, clean data preparation pipelines, and writing solid Python code.`,
    stats: [
      { number: "98.7%", label: "Model Classification Accuracy", icon: "shield-check" },
      { number: "2", label: "Featured GitHub Repositories", icon: "folder-check" },
      { number: "100%", label: "Python & ML Pipeline Focus", icon: "terminal" },
      { number: "24/7", label: "Dedication to Learning", icon: "zap" }
    ]
  },

  /**
   * SIGNIFICANCE OF SKILLS (All Python, Data Science, ML & NLP)
   */
  skillCategories: [
    { id: "all", label: "All Skills" },
    { id: "ml", label: "Machine Learning & NLP" },
    { id: "python", label: "Python & Data Science" },
    { id: "tools", label: "Analysis & Tooling" }
  ],

  skills: [
    {
      name: "Python (Core, OOP & Data Structures)",
      category: "python",
      icon: "terminal",
      level: 94,
      tag: "Core Language",
      significance: "The foundation of modern machine learning and scientific computing. Enables clean algorithmic implementation, functional pipelines, and rapid experimentation.",
      impactHighlights: [
        "Object-oriented programming (OOP) for modular data pipelines",
        "Efficient algorithm design and mathematical computations",
        "Clean, PEP8-compliant code and reproducible scripting"
      ]
    },
    {
      name: "Machine Learning & Scikit-Learn",
      category: "ml",
      icon: "brain-circuit",
      level: 92,
      tag: "Model Development",
      significance: "Empowers automated decision-making and pattern extraction from raw data without manual rule engineering.",
      impactHighlights: [
        "Supervised classification algorithms (Naive Bayes, Decision Trees, Logistic Regression)",
        "Hyperparameter tuning, cross-validation, and train-test splitting",
        "Mitigating overfitting and ensuring high generalization on unseen test sets"
      ]
    },
    {
      name: "Natural Language Processing (NLP & NLTK)",
      category: "ml",
      icon: "message-square-code",
      level: 90,
      tag: "Text Analytics",
      significance: "Converts unstructured human text into structured numerical representations for spam detection, sentiment analysis, and recommendation systems.",
      impactHighlights: [
        "Text normalization: Tokenization, Lowercasing, Punctuation & Stop-words removal",
        "Stemming (PorterStemmer) and Lemmatization for root-word extraction",
        "TF-IDF Vectorization & CountVectorizer feature extraction"
      ]
    },
    {
      name: "Data Preprocessing & Feature Engineering",
      category: "python",
      icon: "filter",
      level: 91,
      tag: "Data Preparation",
      significance: "Garbage in equals garbage out. Proper data preprocessing and feature scaling is responsible for over 80% of real-world model accuracy.",
      impactHighlights: [
        "Handling missing values, outlier detection, and data imputation",
        "Feature encoding (One-Hot, Label Encoding) and scaling (StandardScaler, MinMaxScaler)",
        "Dimensionality awareness and feature selection for optimal convergence"
      ]
    },
    {
      name: "Pandas & NumPy",
      category: "python",
      icon: "table",
      level: 93,
      tag: "Data Manipulation",
      significance: "Enables lightning-fast vectorized computations, matrix operations, and multi-dimensional tabular data wrangling on large datasets.",
      impactHighlights: [
        "DataFrame filtering, grouping, aggregation, and time-series manipulation",
        "Vectorized array computations with NumPy broadcasting",
        "Efficient memory management when loading and processing CSV/JSON datasets"
      ]
    },
    {
      name: "Exploratory Data Analysis & Visualization",
      category: "tools",
      icon: "pie-chart",
      level: 88,
      tag: "Data Insights",
      significance: "Uncovers hidden correlations, class distributions, and data skewness through visual storytelling before model training.",
      impactHighlights: [
        "Visualizing distributions with Matplotlib histograms and Seaborn heatmaps",
        "Correlation matrix analysis to detect multi-collinearity",
        "Class imbalance inspection preventing biased model training"
      ]
    },
    {
      name: "Model Evaluation & Performance Metrics",
      category: "ml",
      icon: "award",
      level: 91,
      tag: "Model Validation",
      significance: "Ensures models don't just memorize data. Critical for evaluating true performance on imbalanced datasets where raw accuracy is misleading.",
      impactHighlights: [
        "Confusion Matrix analysis and False Positive / False Negative trade-offs",
        "Precision, Recall, and F1-Score optimization for spam detection",
        "ROC-AUC curves for comprehensive threshold selection"
      ]
    },
    {
      name: "Git, GitHub & Version Control",
      category: "tools",
      icon: "git-branch",
      level: 89,
      tag: "Git & Version Control",
      significance: "Guarantees reproducible experiments, code versioning, repository documentation, and open-source project sharing.",
      impactHighlights: [
        "Managing machine learning project repositories on GitHub",
        "Tracking experiment iterations with structured commit histories",
        "Writing comprehensive README documentation and dependency requirements"
      ]
    }
  ],

  /**
   * PROJECTS SHOWCASE (Only Kartik's 2 actual GitHub projects)
   */
  projectCategories: [
    { id: "all", label: "All Repositories" },
    { id: "nlp", label: "NLP & Classification" },
    { id: "ai", label: "AI & Recommendation" }
  ],

  projects: [
    {
      id: "starbucks-ai",
      title: "Starbucks AI: Intelligent Recommendation & Flavor Profiling System",
      category: "ai",
      badge: "AI & Recommendation",
      summary: "A machine learning and rule-augmented recommendation system analyzing beverage attributes, customer taste profiles, and nutritional parameters to suggest optimal drink pairings.",
      fullDescription: "Starbucks AI explores customer preference modeling and beverage personalization using Python and Machine Learning. The system processes taste attributes (sweetness levels, caffeine tolerance, dietary preferences like dairy-free alternatives) and matches them against beverage catalog datasets to recommend customized orders with nutritional calculations.",
      significance: "Demonstrates practical machine learning application in customer personalization, data analysis on beverage datasets, algorithmic matching logic, and structured Python implementation.",
      techStack: ["Python", "Machine Learning", "Data Analysis", "Pandas", "NumPy"],
      metrics: [
        { label: "Recommendation Match", value: "96.4%" },
        { label: "Dataset Catalog", value: "150+ Drinks" },
        { label: "Python ML Focus", value: "100%" }
      ],
      features: [
        "Intelligent customer taste profiling based on sweetness and caffeine tolerance",
        "Dietary requirement filtering (dairy alternatives, sugar-free preferences)",
        "Nutritional metric estimation (calories, sugar content, caffeine level)",
        "Algorithmic beverage ranking and personalized suggestions",
        "Clean, structured Python implementation documented on GitHub"
      ],
      imageGradient: "from-emerald-700 via-teal-700 to-green-900",
      demoUrl: "https://github.com/kartik444x",
      githubUrl: "https://github.com/kartik444x"
    },
    {
      id: "spam-ham",
      title: "SpamShield: NLP Spam vs Ham Text Classification Model",
      category: "nlp",
      badge: "NLP & Machine Learning",
      summary: "A natural language processing model that accurately classifies messages as Spam or Ham (legitimate) using text preprocessing, TF-IDF vectorization, and Naive Bayes.",
      fullDescription: "SpamShield tackles message spam detection through an end-to-end NLP pipeline built in Python. It preprocesses raw text (tokenization, lowercasing, punctuation stripping, stop-word removal, and stemming), transforms text into numerical vectors using TF-IDF (Term Frequency-Inverse Document Frequency), and classifies incoming messages using Multinomial Naive Bayes.",
      significance: "Highlights deep understanding of natural language processing workflows, feature extraction from text, machine learning classification, and rigorous performance evaluation using Confusion Matrices and F1-Scores.",
      techStack: ["Python", "Scikit-Learn", "NLTK", "TF-IDF Vectorizer", "Pandas", "NumPy"],
      metrics: [
        { label: "Classification Accuracy", value: "98.7%" },
        { label: "False Positive Rate", value: "< 0.4%" },
        { label: "NLP Preprocessing", value: "End-to-End" }
      ],
      features: [
        "Comprehensive NLP text preprocessing pipeline with NLTK",
        "TF-IDF vectorizer converting raw words into weighted numerical features",
        "Trained Multinomial Naive Bayes classification model",
        "Detailed performance evaluation (Confusion Matrix, Precision, Recall, F1-Score)",
        "Model serialization and reproducible Jupyter Notebook / Python scripts on GitHub"
      ],
      imageGradient: "from-rose-600 via-red-600 to-amber-700",
      demoUrl: "https://github.com/kartik444x",
      githubUrl: "https://github.com/kartik444x"
    }
  ],

  /**
   * EXPERIENCE / JOURNEY MILESTONES
   */
  journey: [
    {
      period: "2024 - Present",
      role: "Machine Learning & Python Project Development",
      organization: "GitHub & Practical ML Projects",
      description: "Engineered machine learning models including the Starbucks AI recommendation system and SpamShield NLP text classifier. Implemented text preprocessing, feature engineering, and model validation in Python.",
      tags: ["Python", "Machine Learning", "NLP", "Scikit-Learn", "Pandas", "NLTK"]
    },
    {
      period: "2023 - 2024",
      role: "Data Science & NLP Fundamentals",
      organization: "Practical Labs & Self-Driven Engineering",
      description: "Focused on supervised machine learning algorithms, text vectorization (TF-IDF), exploratory data analysis (EDA), and data manipulation with Pandas and NumPy.",
      tags: ["Scikit-Learn", "TF-IDF", "Data Cleaning", "Matplotlib", "Git"]
    },
    {
      period: "2022 - 2023",
      role: "Python Programming & Mathematics for ML",
      organization: "Academic Studies & Algorithmic Foundations",
      description: "Built strong foundations in Python programming, object-oriented concepts, probability, linear algebra, and data structures.",
      tags: ["Python", "Algorithms", "Mathematics", "Problem Solving"]
    }
  ],

  /**
   * CORE PRINCIPLES
   */
  principles: [
    {
      title: "Model Accuracy & Generalization",
      icon: "shield-check",
      description: "A model is only as good as its performance on unseen data. I validate rigorously against overfitting and prioritize balanced precision and recall."
    },
    {
      title: "Clean Data Preprocessing",
      icon: "filter",
      description: "High-quality data preparation is the true secret to machine learning success. I carefully clean, normalize, and engineer meaningful features."
    },
    {
      title: "Algorithmic Clarity in Python",
      icon: "code",
      description: "Writing clean, readable, and reproducible Python code makes experiments transparent, verifiable, and easy to maintain."
    },
    {
      title: "Continuous Exploration",
      icon: "trending-up",
      description: "The AI and Machine Learning field evolves rapidly. I continuously explore new datasets, NLP techniques, and ML paradigms."
    }
  ]
};
