// Enhanced main.js with form handling for login and registration

$(document).ready(function() {
    
    // Handle Registration Form Submission
    $('#register-form').on('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = $('#name').val();
        const email = $('#email').val();
        const password = $('#pass').val();
        const confirmPassword = $('#re_pass').val();
        const agreeTerms = $('#agree-term').is(':checked');
        
        // Client-side validation
        if (!name || !email || !password || !confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
        
        if (!agreeTerms) {
            alert('Please agree to the Terms of Service.');
            return;
        }
        
        // Submit to server
        $.ajax({
            url: '/register',
            method: 'POST',
            data: {
                name: name,
                email: email,
                pass: password
            },
            success: function(response) {
                if (response.success) {
                    alert('Registration successful! You can now login.');
                    window.location.href = 'login.html';
                } else {
                    alert(response.message || 'Registration failed.');
                }
            },
            error: function(xhr) {
                const response = JSON.parse(xhr.responseText);
                alert(response.message || 'Registration failed. Please try again.');
            }
        });
    });
    
    // Handle Login Form Submission
    $('#login-form').on('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const username = $('#your_name').val();
        const password = $('#your_pass').val();
        
        // Client-side validation
        if (!username || !password) {
            alert('Please enter both username/email and password.');
            return;
        }
        
        // Submit to server
        $.ajax({
            url: '/login',
            method: 'POST',
            data: {
                your_name: username,
                your_pass: password
            },
            success: function(response) {
                if (response.success) {
                    alert('Welcome, ' + response.user.name + '!');
                    // Redirect to main page or dashboard
                    window.location.href = 'main-index.html';
                } else {
                    alert(response.message || 'Login failed.');
                }
            },
            error: function(xhr) {
                const response = JSON.parse(xhr.responseText);
                alert(response.message || 'Login failed. Please check your credentials.');
            }
        });
    });
    
    // Toggle between forms (if both forms are on same page)
    $('.signup-image-link').on('click', function(e) {
        e.preventDefault();
        const href = $(this).attr('href');
        if (href && href !== '#') {
            window.location.href = href;
        }
    });
    
    // Form validation helpers
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePassword(password) {
        // At least 6 characters
        return password.length >= 6;
    }
    
    // Real-time validation (optional)
    $('#email').on('blur', function() {
        const email = $(this).val();
        if (email && !validateEmail(email)) {
            $(this).addClass('error');
            // You can add error styling in CSS for .error class
        } else {
            $(this).removeClass('error');
        }
    });
    
    $('#pass').on('blur', function() {
        const password = $(this).val();
        if (password && !validatePassword(password)) {
            $(this).addClass('error');
        } else {
            $(this).removeClass('error');
        }
    });
    
    $('#re_pass').on('blur', function() {
        const password = $('#pass').val();
        const confirmPassword = $(this).val();
        if (confirmPassword && password !== confirmPassword) {
            $(this).addClass('error');
        } else {
            $(this).removeClass('error');
        }
    });
    
});