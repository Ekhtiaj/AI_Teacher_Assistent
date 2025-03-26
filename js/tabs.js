document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-button');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab-button').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
});

async function generateLessonPlan() {
    const topic = document.getElementById('lesson-plan-input').value.trim();
    if (!topic) return showError('lesson-plan-output', 'Please enter a topic');
    
    await generateAIResponse({
        input: topic,
        outputElement: 'lesson-plan-output',
        promptTemplate: PROMPT_TEMPLATES.lessonPlan(topic),
        loadingText: 'Creating your customized lesson plan...'
    });
}

async function generateExercises() {
    const topic = document.getElementById('exercise-input').value.trim();
    if (!topic) return showError('exercise-output', 'Please enter a topic');
    
    await generateAIResponse({
        input: topic,
        outputElement: 'exercise-output',
        promptTemplate: PROMPT_TEMPLATES.exercises(topic),
        loadingText: 'Generating targeted exercises...'
    });
}

// Replace the existing generateResources function with this:
async function generateResources() {
    const input = document.getElementById('resources-input').value.trim();
    const output = document.getElementById('resources-output');
    const apiKey = 'AIzaSyCmRUMwVq8a75r_Al5yIxTiaIccj0J7HgQ';
    const maxResults = 3;

    if (!input) {
        output.innerHTML = '<div class="error"><i class="fas fa-exclamation-circle"></i> Please enter a topic first</div>';
        return;
    }

    output.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Searching for resources...</div>';

    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(input + " chinese learning")}&maxResults=${maxResults}&key=${apiKey}`);
        const data = await response.json();

        output.innerHTML = '';
        
        if (data.items && data.items.length > 0) {
            data.items.forEach(item => {
                const videoElement = document.createElement('div');
                videoElement.className = 'resource-card';
                videoElement.innerHTML = `
                    <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank" class="video-link">
                        <div class="video-thumbnail">
                            <img src="${item.snippet.thumbnails.medium.url}" alt="${item.snippet.title}">
                            <div class="play-button"><i class="fas fa-play"></i></div>
                        </div>
                        <h4 class="video-title">${item.snippet.title}</h4>
                        <p class="video-channel">${item.snippet.channelTitle}</p>
                    </a>
                `;
                output.appendChild(videoElement);
            });
        } else {
            output.innerHTML = '<div class="error"><i class="fas fa-exclamation-circle"></i> No videos found</div>';
        }
    } catch (error) {
        console.error('Error:', error);
        output.innerHTML = '<div class="error"><i class="fas fa-exclamation-triangle"></i> Error loading resources</div>';
    }
}

async function generateStudentAnalysis() {
    const input = document.getElementById('student-input').value.trim();
    if (!input) return showError('analysis-output', 'Please enter student data');
    
    await generateAIResponse({
        input,
        outputElement: 'analysis-output',
        promptTemplate: PROMPT_TEMPLATES.analysis(input),
        loadingText: 'Analyzing student performance...'
    });
}

async function generateAIResponse({input, outputElement, promptTemplate, loadingText}) {
    const output = document.getElementById(outputElement);
    output.innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner fa-spin"></i> ${loadingText}
        </div>
    `;
    
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": MODEL,
                "messages": [{
                    "role": "user",
                    "content": promptTemplate
                }]
            })
        });
        
        const data = await response.json();
        const result = data.choices[0].message.content;
        
        output.innerHTML = marked.parse(result);
        addCopyButton(outputElement);
        
    } catch (error) {
        output.innerHTML = `
            <div class="error">
                <i class="fas fa-exclamation-triangle"></i> Error: ${error.message}
            </div>
        `;
    }
}

function addCopyButton(elementId) {
    const output = document.getElementById(elementId);
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.innerHTML = '<i class="far fa-copy"></i> Copy';
    copyBtn.onclick = () => {
        navigator.clipboard.writeText(output.innerText);
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="far fa-copy"></i> Copy';
        }, 2000);
    };
    output.prepend(copyBtn);
}

function showError(elementId, message) {
    const output = document.getElementById(elementId);
    output.innerHTML = `
        <div class="error">
            <i class="fas fa-exclamation-circle"></i> ${message}
        </div>
    `;
}