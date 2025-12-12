
jQuery(document).ready(function($) {
    // Inject Chat UI
    const chatHTML = `
        <div id="smart-assistant-root" class="fixed bottom-4 right-4 z-50 font-sans">
            <button id="sa-toggle-btn" class="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg flex items-center gap-2 transition-transform hover:scale-105">
                <i class="fas fa-robot text-xl"></i>
                <span class="font-medium hidden md:inline">Ask Chioma</span>
            </button>

            <div id="sa-window" class="hidden bg-white rounded-lg shadow-2xl w-80 md:w-96 flex flex-col border border-slate-200 overflow-hidden absolute bottom-16 right-0">
                <div class="bg-green-600 p-4 flex justify-between items-center text-white">
                    <div class="flex items-center gap-2">
                        <div class="bg-white/20 p-2 rounded-full"><i class="fas fa-robot"></i></div>
                        <div>
                            <h3 class="font-bold text-sm">PH Cleaning Assistant</h3>
                            <p class="text-xs text-green-100">Online</p>
                        </div>
                    </div>
                    <button id="sa-close-btn" class="text-white hover:text-green-200"><i class="fas fa-times"></i></button>
                </div>

                <div id="sa-messages" class="h-80 overflow-y-auto p-4 bg-slate-50 space-y-3">
                    <div class="flex justify-start">
                        <div class="bg-white border border-slate-200 text-slate-700 rounded-lg rounded-bl-none shadow-sm p-3 text-sm max-w-[80%]">
                            Hello! I'm Chioma. Ask me about our cleaning services in Port Harcourt!
                        </div>
                    </div>
                </div>

                <div class="p-3 bg-white border-t border-slate-100">
                    <div class="flex gap-2">
                        <input id="sa-input" type="text" placeholder="Ask about prices..." class="flex-1 border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                        <button id="sa-send-btn" class="bg-green-600 text-white rounded-md px-3 py-2 hover:bg-green-700">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    $('body').append(chatHTML);

    const $window = $('#sa-window');
    const $toggleBtn = $('#sa-toggle-btn');
    const $messages = $('#sa-messages');
    const $input = $('#sa-input');
    const $sendBtn = $('#sa-send-btn');

    // Toggle Chat
    $toggleBtn.on('click', function() {
        $window.removeClass('hidden');
        $toggleBtn.addClass('hidden');
        $input.focus();
    });

    $('#sa-close-btn').on('click', function() {
        $window.addClass('hidden');
        $toggleBtn.removeClass('hidden');
    });

    // Send Message
    function sendMessage() {
        const text = $input.val().trim();
        if(!text) return;

        // Add User Message
        $messages.append(`
            <div class="flex justify-end">
                <div class="bg-green-600 text-white rounded-lg rounded-br-none p-3 text-sm max-w-[80%]">${text}</div>
            </div>
        `);
        $input.val('');
        $messages.scrollTop($messages[0].scrollHeight);

        // Add Loading Indicator
        const $loader = $(`
            <div class="flex justify-start loading-msg">
                <div class="bg-slate-100 text-slate-500 rounded-lg rounded-bl-none p-3 text-xs italic">Typing...</div>
            </div>
        `);
        $messages.append($loader);
        $messages.scrollTop($messages[0].scrollHeight);

        // Simulate AI Response (Since we can't easily call GoogleGenAI in vanilla browser JS without setup)
        // Ideally, this calls a WP AJAX endpoint that calls Gemini server-side
        setTimeout(() => {
            $loader.remove();
            const response = generateMockResponse(text);
            $messages.append(`
                <div class="flex justify-start">
                    <div class="bg-white border border-slate-200 text-slate-700 rounded-lg rounded-bl-none shadow-sm p-3 text-sm max-w-[80%]">${response}</div>
                </div>
            `);
            $messages.scrollTop($messages[0].scrollHeight);
        }, 1500);
    }

    $sendBtn.on('click', sendMessage);
    $input.on('keypress', function(e) {
        if(e.which === 13) sendMessage();
    });

    // Simple Rule-based Fallback (To replace full AI if Key is missing)
    function generateMockResponse(query) {
        const q = query.toLowerCase();
        if(q.includes('price') || q.includes('cost')) return "Our General Cleaning starts at ₦15,000, and Deep Cleaning starts at ₦35,000. Would you like to book?";
        if(q.includes('deep')) return "Deep cleaning includes scrubbing tiles, walls, behind appliances, and detailed dusting. Perfect for homes not cleaned professionally in a while.";
        if(q.includes('book')) return "You can book directly using the 'Book Now' button at the top of the page. It takes less than 60 seconds!";
        if(q.includes('area') || q.includes('location')) return "We serve GRA, Trans Amadi, Peter Odili, Woji, and most areas in Port Harcourt.";
        return "I'd love to help with that. Please call our office at 0800-PH-CLEAN for a detailed answer.";
    }
});
