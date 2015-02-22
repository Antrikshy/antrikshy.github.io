$(document).ready(function() {
    $(".intro-text-1").typed({
        strings: ["Software developer with a voracious curiosity and a desire to learn everything.^1800"],
        typeSpeed: 0,
        callback: function() {
            $(".typed-cursor").css('display', 'none');
            $(".intro-text-2").typed({
                strings: ["Computer science student at the University of California, San Diego.^1800<br>"],
                typeSpeed: 0,
                callback: function() {
                    $(".typed-cursor").css('display', 'none');
                    $(".intro-text-3").typed({
                        strings: ["I believe in not just writing code, but designing great experiences."],
                        typeSpeed: 0,
                        callback: function() {
                            console.log("Typing done.");
                        }
                    });
                }
            });
        }
    });
});