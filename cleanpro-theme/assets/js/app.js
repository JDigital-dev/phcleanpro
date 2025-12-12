
jQuery(document).ready(function($) {
    // Mobile Menu Toggle
    $('#mobile-menu-btn').on('click', function() {
        $('#mobile-menu').toggleClass('hidden');
    });

    // Booking Form Submission
    $('#booking-form').on('submit', function(e) {
        e.preventDefault();
        var $form = $(this);
        var $btn = $form.find('button[type="submit"]');
        var $msg = $('#booking-message');

        $btn.prop('disabled', true).text('Processing...');
        $msg.addClass('hidden').removeClass('text-red-500 text-green-500');

        var formData = $form.serializeArray();
        formData.push({ name: 'action', value: 'cleanpro_submit_booking' });
        formData.push({ name: 'nonce', value: cleanpro_vars.nonce });

        $.post(cleanpro_vars.ajax_url, formData, function(response) {
            $btn.prop('disabled', false).text('Confirm Booking');
            $msg.removeClass('hidden');

            if (response.success) {
                $msg.addClass('text-green-500').html('<i class="fas fa-check-circle"></i> ' + response.data.message);
                $form[0].reset();
                setTimeout(function(){
                    window.location.reload(); // Or redirect to success page
                }, 2000);
            } else {
                $msg.addClass('text-red-500').text(response.data.message || 'Error occurred.');
            }
        }).fail(function() {
            $btn.prop('disabled', false).text('Confirm Booking');
            $msg.removeClass('hidden').addClass('text-red-500').text('Network error. Please try again.');
        });
    });
});
