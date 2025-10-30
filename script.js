const PROMPT_INPUT = document.getElementById('prompt-input');
const PROFANITY_CHECKBOX = document.getElementById('profanity-checkbox');
const GENERATE_BTN = document.getElementById('generate-btn');
const OUTPUT_SECTION = document.getElementById('output-section');
const DISS_TRACK_OUTPUT = document.getElementById('diss-track-output');
const ERROR_MESSAGE = document.getElementById('error-message');
const COPY_BTN = document.getElementById('copy-btn');
const DOWNLOAD_BTN = document.getElementById('download-btn');
const RAP_BTN = document.getElementById('rap-btn');
const AUDIO_CONTROLS = document.getElementById('audio-controls');
const PLAY_PAUSE_BTN = document.getElementById('play-pause-btn');
const STOP_BTN = document.getElementById('stop-btn');
const VOLUME_SLIDER = document.getElementById('volume-slider');
 

 

 

// Rap audio state
let audioContext = null;
let beatGainNode = null;
let isRapping = false;
let isPaused = false;
let currentUtterances = [];


// Generate diss track
GENERATE_BTN.addEventListener('click', async () => {
    const prompt = PROMPT_INPUT.value.trim();

    // Validation
    if (!prompt) {
        showError('Please enter a prompt for your diss track');
        return;
    }

    hideError();
    setLoading(true);

    const allowProfanity = PROFANITY_CHECKBOX.checked;

    try {
        const dissTrack = await generateDissTrack(prompt, allowProfanity);
        displayDissTrack(dissTrack);
    } catch (error) {
        showError(`Error generating diss track: ${error.message}`);
        OUTPUT_SECTION.style.display = 'none';
    } finally {
        setLoading(false);
    }
});

async function generateDissTrack(userPrompt, allowProfanity) {
    // Simulate a small delay for better UX (feels more like AI processing)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate using sophisticated local template system
    return generateDissTrackLocal(userPrompt, allowProfanity);
}

function generateDissTrackLocal(userPrompt, allowProfanity = false) {
    // Creative AI-powered template-based diss track generator
    const topics = userPrompt.toLowerCase();
    const words = topics.split(/\s+/).filter(w => w.length > 2);
    
    // Extract key terms for personalization
    const keyTerms = words.slice(0, 3);
    const mainSubject = keyTerms[0] || 'you';
    
    // Generate rhyming words based on key terms
    const rhymeSchemes = generateRhymeVariations(mainSubject, allowProfanity);
    
    const openings = allowProfanity ? [
        "Yo, check the mic, this track's for real",
        "Step up and listen, here's the deal",
        "You think you're tough? That's fake news, you bitch",
        "Time to drop the truth, you're fuckin' going to lose",
        "I'm spitting fire, watch you freeze",
        "This beat goes hard, now you on your knees",
        "You called me out? That's a mistake, you're fake",
        "Now I'm here and you're gonna break",
        "Listen up, this is the real deal",
        "Time to expose you, how does it feel?",
        "You thought you were hot? Think again, you're not",
        "This is where your whole game stops",
        "You're about to get your ass beat",
        "Time to show you, you're obsolete"
    ] : [
        "Yo, check the mic, this track's for real",
        "Step up and listen, here's the deal",
        "You think you're tough? That's fake news",
        "Time to drop the truth, you're going to lose",
        "I'm spitting fire, watch you freeze",
        "This beat goes hard, now you on your knees",
        "You called me out? That's a mistake",
        "Now I'm here and you're gonna break"
    ];
    
    const verseTemplates = [
        // Template 1: Direct confrontation
        () => [
            `You talk ${rhymeSchemes.adj1}, you act ${rhymeSchemes.adj2}`,
            `But everyone knows you're just ${rhymeSchemes.adj3}`,
            `${rhymeSchemes.insult1}, that's what they say`,
            `You're ${rhymeSchemes.insult2}, end of the day`
        ],
        // Template 2: Comparison
        () => [
            `${mainSubject}'s at the bottom, I'm at the top`,
            `While ${mainSubject} is weak, my game won't stop`,
            `${rhymeSchemes.comparison1}, that's the way`,
            `${rhymeSchemes.comparison2}, I'm here to stay`
        ],
        // Template 3: Wordplay
        () => [
            `You think you're ${rhymeSchemes.think1} but you're just ${rhymeSchemes.think2}`,
            `${rhymeSchemes.wordplay1} is what I heard`,
            `Your ${rhymeSchemes.wordplay2} is weak, that's absurd`,
            `${rhymeSchemes.wordplay3}, you're not preferred`
        ],
        // Template 4: Challenge
        () => [
            `${mainSubject} stepped up, now watch ${mainSubject} fall`,
            `You're ${rhymeSchemes.challenge1}, I got ${rhymeSchemes.challenge2}`,
            `${rhymeSchemes.challenge3}, that's the call`,
            `You're ${rhymeSchemes.challenge4}, I got it all`
        ],
        // Template 5: Status
        () => [
            `${mainSubject}'s the past, I'm the future`,
            `${mainSubject}'s the loser, I'm the recruiter`,
            `${rhymeSchemes.status1}, ${rhymeSchemes.status2}`,
            `${rhymeSchemes.status3}, that's what's true`
        ],
        // Template 6: Skill comparison
        () => [
            `Your ${rhymeSchemes.skill1} is ${rhymeSchemes.skill2}, mine's elite`,
            `${mainSubject} gets ${rhymeSchemes.skill3}, I can't be beat`,
            `${rhymeSchemes.skill4}, that's the difference`,
            `You're ${rhymeSchemes.skill5}, I got persistence`
        ],
        // Template 7: Aggressive (profanity only)
        ...(allowProfanity ? [() => [
            `${rhymeSchemes.aggressive1}`,
            `${rhymeSchemes.aggressive2}`,
            `${rhymeSchemes.aggressive3}`,
            `${rhymeSchemes.aggressive4}`
        ]] : [])
    ];
    
    const bridges = allowProfanity ? [
        "\n(Yeah, you heard that right)\n",
        "\n(This is just getting started)\n",
        "\n(You feeling this yet?)\n",
        "\n(It only gets worse)\n",
        "\n(Bring it on)\n",
        "\n(You can't handle this)\n",
        "\n(This is getting real)\n"
    ] : [
        "\n(Yeah, you heard that right)\n",
        "\n(This is just getting started)\n",
        "\n(You feeling this yet?)\n",
        "\n(It only gets worse)\n",
        "\n(Bring it on)\n"
    ];
    
    const closings = allowProfanity ? [
        "So step back now, you're clearly done, you're fucked",
        "This track's finished, you came up short, you're beat",
        "I'm the winner, you're just a bitch, you're lost",
        "Mic drop, case closed, you lost",
        "Game over, time to face the cost, you're crossed",
        "This is how the champions play",
        "You're yesterday, I'm here to stay",
        "You're done, you're finished, you're fucked",
        "Mic drop, you're a bust, you're out",
        "That's it, you're done, no doubt"
    ] : [
        "So step back now, you're clearly done",
        "This track's finished, you came up short",
        "I'm the winner, you're just a sport",
        "Mic drop, case closed, you lost",
        "Game over, time to face the cost",
        "This is how the champions play",
        "You're yesterday, I'm here to stay"
    ];
    
    // Build the diss track
    const opening = openings[Math.floor(Math.random() * openings.length)];
    let track = opening + '\n\n';
    
    // Add 4-5 verses with variety
    const numVerses = 4 + Math.floor(Math.random() * 2);
    const usedTemplates = new Set();
    
    for (let i = 0; i < numVerses; i++) {
        let templateIndex;
        do {
            templateIndex = Math.floor(Math.random() * verseTemplates.length);
        } while (usedTemplates.has(templateIndex) && usedTemplates.size < verseTemplates.length);
        
        usedTemplates.add(templateIndex);
        const verse = verseTemplates[templateIndex]();
        
        verse.forEach(line => {
            track += line + '\n';
        });
        
        // Add bridge sometimes
        if (i < numVerses - 1 && Math.random() > 0.6) {
            track += bridges[Math.floor(Math.random() * bridges.length)];
        } else {
            track += '\n';
        }
    }
    
    const closing = closings[Math.floor(Math.random() * closings.length)];
    track += closing;
    
    return track;
}

function generateRhymeVariations(subject, allowProfanity = false) {
    const cleanRhymeSets = [
        {
            adj1: "big", adj2: "fake", adj3: "weak",
            insult1: "No credibility", insult2: "a fraud",
            comparison1: "You're weak sauce", comparison2: "I'm the boss",
            think1: "sharp", think2: "dull", wordplay1: "Rep", wordplay2: "rep", wordplay3: "Zero rep",
            challenge1: "nothing", challenge2: "everything", challenge3: "One on one", challenge4: "a bust",
            status1: "You're washed up", status2: "I'm brand new", status3: "You're through",
            skill1: "game", skill2: "lame", skill3: "defeated", skill4: "You're deleted", skill5: "defeated"
        },
        {
            adj1: "tough", adj2: "rough", adj3: "soft",
            insult1: "All talk no walk", insult2: "a joke",
            comparison1: "You're bottom tier", comparison2: "I'm top tier",
            think1: "clever", think2: "never", wordplay1: "Style", wordplay2: "file", wordplay3: "Out of style",
            challenge1: "weak", challenge2: "peak", challenge3: "Face to face", challenge4: "disgraced",
            status1: "You're finished", status2: "I'm established", status3: "You vanished",
            skill1: "flow", skill2: "slow", skill3: "shown up", skill4: "You're second best", skill5: "outclassed"
        },
        {
            adj1: "slick", adj2: "quick", adj3: "sick",
            insult1: "Zero respect", insult2: "not correct",
            comparison1: "You're a loser", comparison2: "I'm the chooser",
            think1: "smart", think2: "not", wordplay1: "Buzz", wordplay2: "fuzz", wordplay3: "No buzz",
            challenge1: "pretending", challenge2: "never ending", challenge3: "Come test me", challenge4: "can't best me",
            status1: "You're outdated", status2: "I'm upgraded", status3: "You faded",
            skill1: "rhyme", skill2: "crime", skill3: "crushed", skill4: "You're hushed", skill5: "rushed"
        }
    ];
    
    const profaneRhymeSets = [
        {
            adj1: "tough", adj2: "fake", adj3: "weak as fuck",
            insult1: "You're a piece of trash", insult2: "a waste, you bitch",
            comparison1: "You're weak sauce", comparison2: "I'm the boss",
            think1: "smart", think2: "dumb as hell", wordplay1: "Rep", wordplay2: "rep", wordplay3: "Zero rep, you're fucked",
            challenge1: "nothing", challenge2: "everything", challenge3: "One on one", challenge4: "a bust",
            status1: "You're washed up, you're fucked", status2: "I'm brand new", status3: "You're through, you're done",
            skill1: "game", skill2: "lame", skill3: "defeated", skill4: "You're deleted", skill5: "defeated",
            aggressive1: "You think you're tough but you're just a bitch",
            aggressive2: "All that fuckin' talk, it makes me sick",
            aggressive3: "You're nothing but a pathetic joke",
            aggressive4: "Time to watch your whole world broke"
        },
        {
            adj1: "big", adj2: "rough", adj3: "soft as shit",
            insult1: "You're garbage, that's a fact", insult2: "a fuckin' hack",
            comparison1: "You're bottom tier", comparison2: "I'm top tier",
            think1: "sharp", think2: "weak as fuck", wordplay1: "Style", wordplay2: "file", wordplay3: "Out of style, you're vile",
            challenge1: "weak", challenge2: "peak", challenge3: "Face to face", challenge4: "disgraced",
            status1: "You're finished, you're fucked", status2: "I'm established", status3: "You vanished, you're banished",
            skill1: "flow", skill2: "slow", skill3: "shown up", skill4: "You're second best", skill5: "outclassed",
            aggressive1: "You came at me but you're gonna lose",
            aggressive2: "Your game is weak, that's the fuckin' truth",
            aggressive3: "You're talking trash but you can't back it up",
            aggressive4: "Now it's time to shut your bitch ass up"
        },
        {
            adj1: "slick", adj2: "quick", adj3: "weak as fuck",
            insult1: "You're pathetic, let's be real", insult2: "a fuckin' joke",
            comparison1: "You're a loser", comparison2: "I'm the chooser",
            think1: "clever", think2: "never", wordplay1: "Buzz", wordplay2: "fuzz", wordplay3: "No buzz, you're a dud",
            challenge1: "pretending", challenge2: "never ending", challenge3: "Come test me", challenge4: "can't best me",
            status1: "You're outdated, you're fucked", status2: "I'm upgraded", status3: "You faded, you're jaded",
            skill1: "rhyme", skill2: "crime", skill3: "crushed", skill4: "You're hushed", skill5: "rushed",
            aggressive1: "You thought you were hot but you're not",
            aggressive2: "Time to show you what you got",
            aggressive3: "You're weak as hell, you're a bitch",
            aggressive4: "Now it's time to see how it goes, you're finished"
        },
        {
            adj1: "tough", adj2: "fake as fuck", adj3: "weak",
            insult1: "You're a fuckin' waste of space", insult2: "a worthless piece of shit",
            comparison1: "You're weak sauce", comparison2: "I'm the boss, you're lost",
            think1: "smart", think2: "dumb as hell", wordplay1: "Rep", wordplay2: "rep", wordplay3: "Zero rep, you're fucked",
            challenge1: "nothing", challenge2: "everything", challenge3: "One on one", challenge4: "a bust",
            status1: "You're washed up, you're done", status2: "I'm brand new", status3: "You're through, you bitch",
            skill1: "game", skill2: "lame", skill3: "defeated, you're beat", skill4: "You're deleted", skill5: "defeated",
            aggressive1: "You think you're tough but you're just a weak bitch",
            aggressive2: "All that fuckin' talk, it makes me sick",
            aggressive3: "You're nothing but a pathetic little joke",
            aggressive4: "Time to watch your whole world broke, you're broke"
        },
        {
            adj1: "big", adj2: "rough", adj3: "soft as shit",
            insult1: "You're garbage, a fuckin' loser", insult2: "a damn hack, you're whack",
            comparison1: "You're bottom tier", comparison2: "I'm top tier, you're weird",
            think1: "sharp", think2: "weak as fuck", wordplay1: "Style", wordplay2: "file", wordplay3: "Out of style, you're vile",
            challenge1: "weak", challenge2: "peak", challenge3: "Face to face", challenge4: "disgraced, you're faced",
            status1: "You're finished, you're fucked", status2: "I'm established", status3: "You vanished, you're banished, you're done",
            skill1: "flow", skill2: "slow", skill3: "shown up", skill4: "You're second best", skill5: "outclassed, you're passed",
            aggressive1: "You came at me but you're fuckin' gonna lose",
            aggressive2: "Your game is weak, that's the goddamn truth",
            aggressive3: "You're talking trash but you can't back it up, you bitch",
            aggressive4: "Now it's time to shut your ass up, you're stuck"
        }
    ];
    
    const rhymeSets = allowProfanity ? profaneRhymeSets : cleanRhymeSets;
    return rhymeSets[Math.floor(Math.random() * rhymeSets.length)];
}

function displayDissTrack(dissTrack) {
    DISS_TRACK_OUTPUT.textContent = dissTrack;
    OUTPUT_SECTION.style.display = 'block';
    OUTPUT_SECTION.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function setLoading(isLoading) {
    GENERATE_BTN.disabled = isLoading;
    const btnText = GENERATE_BTN.querySelector('.btn-text');
    const btnLoader = GENERATE_BTN.querySelector('.btn-loader');
    
    if (isLoading) {
        btnText.style.display = 'none';
        btnLoader.style.display = 'flex';
    } else {
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
}

function showError(message) {
    ERROR_MESSAGE.textContent = message;
    ERROR_MESSAGE.style.display = 'block';
}

function hideError() {
    ERROR_MESSAGE.style.display = 'none';
}

// Copy to clipboard
COPY_BTN.addEventListener('click', async () => {
    const text = DISS_TRACK_OUTPUT.textContent;
    
    try {
        await navigator.clipboard.writeText(text);
        COPY_BTN.textContent = '✓ Copied!';
        COPY_BTN.classList.add('copied');
        
        setTimeout(() => {
            COPY_BTN.textContent = '📋 Copy';
            COPY_BTN.classList.remove('copied');
        }, 2000);
    } catch (err) {
        showError('Failed to copy to clipboard');
    }
});

// Download as text file
DOWNLOAD_BTN.addEventListener('click', () => {
    const text = DISS_TRACK_OUTPUT.textContent;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diss-track-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Allow Enter key to submit (Ctrl/Cmd + Enter)
PROMPT_INPUT.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        GENERATE_BTN.click();
    }
});

// Initialize audio context on user interaction
async function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    // Resume audio context if suspended (required by browser autoplay policies)
    if (audioContext.state === 'suspended') {
        try {
            await audioContext.resume();
            console.log('AudioContext resumed');
        } catch (error) {
            console.error('Failed to resume AudioContext:', error);
        }
    }
    
    return audioContext;
}

// Hip-hop beat pattern constants
const BPM = 95;
const BEAT_DURATION = 60 / BPM; // Duration of one beat
const LOOP_DURATION = BEAT_DURATION * 8; // 8-beat loop (2 bars)
let beatStartTime = 0;
let beatLoopInterval = null;

// Generate hip-hop beat using Web Audio API
async function createBeat() {
    const ctx = await initAudioContext();
    
    // Create master gain for beat if it doesn't exist
    if (!beatGainNode) {
        beatGainNode = ctx.createGain();
        beatGainNode.connect(ctx.destination);
        const volume = VOLUME_SLIDER ? VOLUME_SLIDER.value / 100 : 0.8;
        beatGainNode.gain.value = Math.max(0.05, volume * 0.2); // Softer beat vs vocals
    }
    
    beatStartTime = ctx.currentTime + 0.1; // Small delay to ensure context is ready
    
    // Start the beat loop
    scheduleBeatLoop(ctx, beatStartTime);
    
    // Schedule next loop
    scheduleBeatLoop(ctx, beatStartTime + LOOP_DURATION);
    scheduleBeatLoop(ctx, beatStartTime + LOOP_DURATION * 2);
    scheduleBeatLoop(ctx, beatStartTime + LOOP_DURATION * 3);
    
    // Continue looping
    if (beatLoopInterval) {
        clearInterval(beatLoopInterval);
    }
    
    beatLoopInterval = setInterval(() => {
        if (!isRapping || isPaused || !audioContext) {
            if (beatLoopInterval) {
                clearInterval(beatLoopInterval);
                beatLoopInterval = null;
            }
            return;
        }
        const currentTime = audioContext.currentTime;
        const nextLoopStart = Math.ceil((currentTime - beatStartTime) / LOOP_DURATION) * LOOP_DURATION + beatStartTime;
        if (nextLoopStart > currentTime) {
            scheduleBeatLoop(audioContext, nextLoopStart);
        }
    }, LOOP_DURATION * 1000 * 0.8); // Schedule slightly before to avoid gaps
}

// Schedule a single beat loop
function scheduleBeatLoop(ctx, startTime) {
    if (!ctx || isPaused) return;
    
    const kickSchedule = [0, 2, 3.5, 4, 6];
    const snareSchedule = [1, 5];
    const hiHatSchedule = [0.5, 1.5, 2.5, 3, 4.5, 5.5, 6.5, 7];
    
    // Kick drum (bass)
    kickSchedule.forEach(beat => {
        const time = startTime + beat * BEAT_DURATION;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(60, time);
        osc.frequency.exponentialRampToValueAtTime(30, time + 0.1);
        
        filter.type = 'lowpass';
        filter.frequency.value = 200;
        
        gain.gain.setValueAtTime(0.7, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(beatGainNode);
        
        osc.start(time);
        osc.stop(time + 0.15);
    });
    
    // Snare drum
    snareSchedule.forEach(beat => {
        const time = startTime + beat * BEAT_DURATION;
        const bufferSize = ctx.sampleRate * 0.1;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
        }
        
        const noise = ctx.createBufferSource();
        const noiseGain = ctx.createGain();
        const noiseFilter = ctx.createBiquadFilter();
        
        noise.buffer = buffer;
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.value = 1000;
        noiseFilter.Q.value = 0.5;
        
        noiseGain.gain.setValueAtTime(0.5, time);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.08);
        
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(beatGainNode);
        
        noise.start(time);
        noise.stop(time + 0.1);
    });
    
    // Hi-hats
    hiHatSchedule.forEach(beat => {
        const time = startTime + beat * BEAT_DURATION;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        osc.type = 'square';
        osc.frequency.value = 8000;
        
        filter.type = 'highpass';
        filter.frequency.value = 7000;
        
        gain.gain.setValueAtTime(0.08, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.02);
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(beatGainNode);
        
        osc.start(time);
        osc.stop(time + 0.02);
    });
}

// Parse lyrics into rap lines with timing
function parseLyricsForRap(text) {
    // Split by lines, filter empty lines and remove parentheses sections (they're background)
    const lines = text.split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('(') && !line.endsWith(')'))
        .filter(line => line.length > 0);
    
    return lines;
}

// Rap a line with proper timing and flow
function rapLine(line, index, totalLines, onComplete) {
    return new Promise((resolve) => {
        if (isPaused || !isRapping) {
            resolve();
            return;
        }
        
        // Check if speech synthesis is available
        if (!window.speechSynthesis) {
            console.error('Speech synthesis not available');
            showError('Speech synthesis not supported in this browser');
            resolve();
            return;
        }
        
        // Calculate timing based on rap flow
        // Longer lines need more time, shorter pauses between
        const words = line.split(/\s+/).length;
        const baseRate = 1.15; // Slightly faster for rap feel
        let rate = Math.max(0.9, Math.min(1.3, baseRate - (words > 10 ? 0.1 : 0)));
        
        // Adjust pitch slightly for variation
        let pitch = 1 + (index % 3 === 0 ? 0.05 : 0); // Slight pitch variation

        
        
        const utterance = new SpeechSynthesisUtterance(line);
        
        // Configure for rap-like delivery
        utterance.rate = rate;
        utterance.pitch = pitch;
        const volume = VOLUME_SLIDER ? VOLUME_SLIDER.value / 100 : 0.9;
        utterance.volume = volume;
        
        // Get voices (load if needed)
        let voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) {
            // Wait for voices to load
            window.speechSynthesis.onvoiceschanged = () => {
                voices = window.speechSynthesis.getVoices();
                selectVoice(utterance, voices);
            };
        } else {
            selectVoice(utterance, voices);
        }
        
        function selectVoice(utt, voiceList) {
            if (!voiceList || voiceList.length === 0) {
                return;
            }
            
            // Try to find a good default voice - prefer natural/male voices
            const lower = (v) => v.name.toLowerCase();
            const male = voiceList.find(v => /male/i.test(v.name));
            const natural = voiceList.find(v => lower(v).includes('natural'));
            const alex = voiceList.find(v => lower(v).includes('alex'));
            const daniel = voiceList.find(v => lower(v).includes('daniel'));
            const enhanced = voiceList.find(v => /enhanced/i.test(v.name));
            
            // Priority order: enhanced > daniel > natural > alex > male > first available
            utt.voice = enhanced || daniel || natural || alex || male || voiceList[0];
        }
        
        utterance.onend = () => {
            currentUtterances = currentUtterances.filter(u => u !== utterance);
            // Pause between lines (shorter for rap flow)
            const pauseTime = index < totalLines - 1 ? (words > 8 ? 200 : 300) : 0;
            setTimeout(() => {
                resolve();
                if (onComplete) onComplete();
            }, pauseTime);
        };
        
        utterance.onerror = (e) => {
            console.error('Speech error:', e);
            currentUtterances = currentUtterances.filter(u => u !== utterance);
            resolve();
            if (onComplete) onComplete();
        };
        
        utterance.onstart = () => {
            console.log('Rapping:', line);
        };
        
        currentUtterances.push(utterance);
        
        // Cancel any pending speech first
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
        
        window.speechSynthesis.speak(utterance);
    });
}

 

// Rap the entire diss track
async function rapDissTrack() {
    const dissTrack = DISS_TRACK_OUTPUT.textContent.trim();
    
    if (!dissTrack) {
        showError('No diss track to rap. Generate one first!');
        return;
    }
    
    if (isRapping && !isPaused) {
        // Already rapping, pause it
        pauseRap();
        return;
    }
    
    if (isPaused) {
        // Resume
        resumeRap();
        return;
    }
    
    // Start rapping
    hideError();
    setRapLoading(true);
    
    try {
        // Check if speech synthesis is available
        if (!window.speechSynthesis) {
            showError('Speech synthesis not supported in this browser. Please use Chrome, Edge, or Safari.');
            setRapLoading(false);
            return;
        }
        
        // Initialize audio context and resume if needed
        await initAudioContext();
        
        // Start the beat
        isRapping = true;
        isPaused = false;
        await createBeat();
        
        // TTS per line
        let voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) {
            window.speechSynthesis.onvoiceschanged = () => {
                voices = window.speechSynthesis.getVoices();
                setTimeout(() => {
                    startRappingLyrics(dissTrack);
                }, 100);
            };
        } else {
            setTimeout(() => {
                startRappingLyrics(dissTrack);
            }, 300);
        }
        
    } catch (error) {
        console.error('Error starting rap:', error);
        showError(`Error starting rap: ${error.message}`);
        stopRap();
        setRapLoading(false);
    }
}

async function startRappingLyrics(text) {
    const lines = parseLyricsForRap(text);
    
    if (lines.length === 0) {
        showError('No valid lyrics to rap');
        stopRap();
        setRapLoading(false);
        return;
    }
    
    setRapLoading(false);
    AUDIO_CONTROLS.style.display = 'flex';
    PLAY_PAUSE_BTN.textContent = '⏸️ Pause';
    
    // Rap each line with flow
    for (let i = 0; i < lines.length; i++) {
        if (!isRapping) break;
        
        while (isPaused && isRapping) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        if (!isRapping) break;
        
        await rapLine(lines[i], i, lines.length);
    }
    
    // Finished
    if (isRapping) {
        stopRap();
    }
}

function pauseRap() {
    isPaused = true;
    window.speechSynthesis.pause();
    if (beatGainNode && audioContext) {
        beatGainNode.gain.setValueAtTime(0, audioContext.currentTime);
    }
 
    PLAY_PAUSE_BTN.textContent = '▶️ Resume';
}

function resumeRap() {
    isPaused = false;
    window.speechSynthesis.resume();
    if (beatGainNode && audioContext) {
        const volume = VOLUME_SLIDER ? VOLUME_SLIDER.value / 100 : 0.7;
        beatGainNode.gain.setValueAtTime(volume * 0.3, audioContext.currentTime);
        // Restart beat loop if needed
        if (!beatLoopInterval && isRapping) {
            createBeat();
        }
    }
    PLAY_PAUSE_BTN.textContent = '⏸️ Pause';
}

function stopRap() {
    isRapping = false;
    isPaused = false;
    
    // Stop speech
    window.speechSynthesis.cancel();
    currentUtterances = [];
    
    // Stop beat loop
    if (beatLoopInterval) {
        clearInterval(beatLoopInterval);
        beatLoopInterval = null;
    }
    
 
    
    // Reset beat gain
    if (beatGainNode) {
        beatGainNode.gain.setValueAtTime(0, audioContext ? audioContext.currentTime : 0);
    }
    
    // Close audio context
    if (audioContext && audioContext.state !== 'closed') {
        audioContext.close().catch(() => {});
        audioContext = null;
        beatGainNode = null;
    }
    
    AUDIO_CONTROLS.style.display = 'none';
    setRapLoading(false);
}

function setRapLoading(isLoading) {
    RAP_BTN.disabled = isLoading;
    const btnText = RAP_BTN.querySelector('.rap-btn-text');
    const btnLoader = RAP_BTN.querySelector('.rap-btn-loading');
    
    if (isLoading) {
        btnText.style.display = 'none';
        btnLoader.style.display = 'flex';
    } else {
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        
        if (isRapping && !isPaused) {
            RAP_BTN.querySelector('.rap-btn-text').textContent = '⏸️ Pause Rap';
        } else if (isPaused) {
            RAP_BTN.querySelector('.rap-btn-text').textContent = '▶️ Resume Rap';
        } else {
            RAP_BTN.querySelector('.rap-btn-text').textContent = '🎤 Rap It with Beat';
        }
    }
}

// Event listeners
RAP_BTN.addEventListener('click', rapDissTrack);
PLAY_PAUSE_BTN.addEventListener('click', () => {
    if (isPaused) {
        resumeRap();
    } else {
        pauseRap();
    }
});
STOP_BTN.addEventListener('click', stopRap);

VOLUME_SLIDER.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    if (beatGainNode && audioContext) {
        beatGainNode.gain.setValueAtTime(volume * 0.3, audioContext.currentTime);
    }
 
    // Adjust speech volume for future utterances
    // Note: Can't change volume of already speaking utterances
});

