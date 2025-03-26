const PROMPT_TEMPLATES = {
    lessonPlan: (topic) => `
    As a Chinese language teaching expert, create a comprehensive lesson plan about "${topic}". 
    Include these sections in markdown format:
    
    # Lesson Title: [creative title]
    ## Grade Level: [appropriate level]
    ## Lesson Duration: [time]
    
    ### Learning Objectives:
    - At least 3 clear objectives
    
    ### Materials Needed:
    - List of required materials
    
    ### Lesson Structure:
    1. Warm-up Activity (5-10 mins)
    2. Presentation (15-20 mins)
    3. Practice Activities (20-25 mins)
    4. Assessment (10-15 mins)
    5. Extension/Homework
    
    ### Cultural Notes:
    - Relevant cultural insights
    
    Provide the response in proper markdown formatting.`,

    exercises: (topic) => `
    Generate 5 different types of exercises about "${topic}" for Chinese language learners.
    For each exercise type, include:
    
    - Clear instructions in Chinese (with Pinyin) and English
    - Appropriate difficulty level indication
    - Example answers where applicable
    
    Exercise types should include:
    1. Vocabulary practice
    2. Grammar drill
    3. Reading comprehension
    4. Listening/speaking activity
    5. Writing task
    
    Format the response in markdown with clear section headings.`,

    resources: (topic) => `
    Recommend multimedia resources for teaching "${topic}" in Chinese class.
    For each resource, provide:
    
    - Resource type (video, image, podcast, etc.)
    - Title and source
    - Direct link if available
    - Appropriate student level
    - Brief description of how to use it
    
    Include at least 5 different resources.
    Format as a markdown list with clear headings.`,

    analysis: (input) => `
    Analyze this Chinese language student data:
    "${input}"
    
    Provide a detailed report with:
    
    ## Strengths
    - List 3-5 strengths with examples
    
    ## Areas for Improvement
    - List 3-5 areas with specific examples
    
    ## Recommended Activities
    - Personalized practice recommendations
    
    ## Teaching Strategies
    - Suggested instructional approaches
    
    Format the response in markdown with clear headings.`
};