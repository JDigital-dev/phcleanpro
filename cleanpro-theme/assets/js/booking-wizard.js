
jQuery(document).ready(function($) {
    if (!$('#cleanpro-booking-wizard').length) return;

    // State
    let currentStep = 1;
    let bookingData = {
        serviceId: '',
        addons: [],
        neighborhood: cleanproData.neighborhoods[0].name,
        address: '',
        date: '',
        time: '',
        name: '',
        email: '',
        phone: ''
    };

    // DOM Elements
    const $steps = $('.wizard-step');
    const $indicators = $('.step-indicator');
    const $progressBar = $('.progress-bar-fill');
    
    // Helper: Update UI based on step
    function updateStep() {
        $steps.addClass('hidden');
        $(`[data-step="${currentStep}"]`).removeClass('hidden');
        
        // Update indicators
        $indicators.removeClass('bg-green-600 bg-slate-200').addClass('bg-slate-200');
        $indicators.each(function(index) {
            if (index + 1 <= currentStep) {
                $(this).removeClass('bg-slate-200').addClass('bg-green-600');
            }
        });
        
        calculateTotal();
    }

    // Helper: Calculate Total Price
    function calculateTotal() {
        let total = 0;
        
        // Service Price
        const service = cleanproData.services.find(s => s.id === bookingData.serviceId);
        if (service) total += parseInt(service.basePrice);

        // Addons Price
        bookingData.addons.forEach(addonId => {
            const addon = cleanproData.addons.find(a => a.id === addonId);
            if (addon) total += parseInt(addon.price);
        });

        // Neighborhood Surcharge
        const hood = cleanproData.neighborhoods.find(n => n.name === bookingData.neighborhood);
        if (hood) total += parseInt(hood.surcharge);

        $('#total-estimate-display').text('₦' + total.toLocaleString());
        $('#summary-service').text(service ? service.title : '-');
        $('#summary-addons').text(bookingData.addons.length + ' items');
        $('#summary-location').text(bookingData.neighborhood);
        $('#summary-datetime').text(bookingData.date ? `${bookingData.date} at ${bookingData.time}` : '-');
    }

    // --- Event Listeners ---

    // Step 1: Service Selection
    $('.service-card').on('click', function() {
        $('.service-card').removeClass('border-green-600 bg-green-50').addClass('border-slate-200');
        $(this).removeClass('border-slate-200').addClass('border-green-600 bg-green-50');
        
        bookingData.serviceId = $(this).data('id');
        $('#btn-step-1-next').prop('disabled', false).removeClass('opacity-50 cursor-not-allowed');
    });

    $('#btn-step-1-next').on('click', function() {
        if(bookingData.serviceId) {
            currentStep = 2;
            updateStep();
        }
    });

    // Step 2: Addons & Location
    $('.addon-checkbox').on('change', function() {
        const id = $(this).val();
        if($(this).is(':checked')) {
            bookingData.addons.push(id);
        } else {
            bookingData.addons = bookingData.addons.filter(a => a !== id);
        }
        calculateTotal();
    });

    $('#neighborhood-select').on('change', function() {
        bookingData.neighborhood = $(this).val();
        calculateTotal();
    });

    $('#address-input').on('input', function() {
        bookingData.address = $(this).val();
        const isValid = bookingData.address.length > 0;
        $('#btn-step-2-next').prop('disabled', !isValid).toggleClass('opacity-50', !isValid);
    });

    $('#btn-step-2-next').on('click', function() {
        if(bookingData.address) {
            currentStep = 3;
            updateStep();
        }
    });

    $('#btn-step-2-back').on('click', function() {
        currentStep = 1;
        updateStep();
    });

    // Step 3: Schedule
    $('#date-input').on('change', function() {
        bookingData.date = $(this).val();
        checkScheduleValidity();
    });

    $('.time-slot-btn').on('click', function() {
        $('.time-slot-btn').removeClass('bg-green-600 text-white').addClass('bg-white text-slate-600 border-slate-300');
        $(this).removeClass('bg-white text-slate-600 border-slate-300').addClass('bg-green-600 text-white border-green-600');
        bookingData.time = $(this).data('slot');
        checkScheduleValidity();
    });

    function checkScheduleValidity() {
        const isValid = bookingData.date && bookingData.time;
        $('#btn-step-3-next').prop('disabled', !isValid).toggleClass('opacity-50', !isValid);
    }

    $('#btn-step-3-next').on('click', function() {
        if(bookingData.date && bookingData.time) {
            currentStep = 4;
            updateStep();
        }
    });

    $('#btn-step-3-back').on('click', function() {
        currentStep = 2;
        updateStep();
    });

    // Step 4: Details & Submit
    $('#contact-name, #contact-email, #contact-phone').on('input', function() {
        bookingData.name = $('#contact-name').val();
        bookingData.email = $('#contact-email').val();
        bookingData.phone = $('#contact-phone').val();
        
        const isValid = bookingData.name && bookingData.email && bookingData.phone;
        $('#btn-submit-booking').prop('disabled', !isValid).toggleClass('opacity-50', !isValid);
    });

    $('#btn-step-4-back').on('click', function() {
        currentStep = 3;
        updateStep();
    });

    $('#btn-submit-booking').on('click', function() {
        const $btn = $(this);
        $btn.prop('disabled', true).text('Processing...');
        
        $.ajax({
            url: cleanproData.ajax_url,
            method: 'POST',
            data: {
                action: 'cleanpro_submit_booking',
                nonce: cleanproData.nonce,
                booking_data: bookingData
            },
            success: function(response) {
                if(response.success) {
                    $('#cleanpro-booking-wizard').html(`
                        <div class="text-center py-12">
                            <div class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                                <i class="fas fa-check"></i>
                            </div>
                            <h2 class="text-2xl font-bold mb-4">Booking Confirmed!</h2>
                            <p class="text-slate-600 mb-8">Thank you, ${bookingData.name}. We have sent a confirmation to ${bookingData.email}.</p>
                            <a href="/" class="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-700">Return Home</a>
                        </div>
                    `);
                } else {
                    alert('Error: ' + response.data.message);
                    $btn.prop('disabled', false).text('Confirm Booking');
                }
            },
            error: function() {
                alert('Network error. Please try again.');
                $btn.prop('disabled', false).text('Confirm Booking');
            }
        });
    });

    // Initialize
    updateStep();
});
