<template>
    <div class="parsed-html" v-if="html" v-html="parsedHTML"></div>
</template>

<script setup>
    const props = defineProps({
        html: String
    })

    const parsedHTML = computed(()=>
        {
            if(!props.html)return null;

            let resHTML = props.html;

            const phoneRegex = /((\(|\+7|\b8)[ ]?(\(?\d{3,4}\)?[\- ]?)[\d\- ]{6,9}\d)/g
            const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}(?![^<]*<\/a>)/gi;

            resHTML = resHTML.replace(/style="[^"]*"/g, '')
                .replace(phoneRegex, match => {
                    // const formatted = match.startsWith('+7') || match.startsWith('8') ? match : `+7${match}`;
                    const formatted = match.replace(/^\+7\(?|^8\(?|^8\s?\(?\d*/, '')
                    
                    const cleaned = formatted.replace(/\D/g, '');
                    return `<a href="tel:+7${cleaned}">${match}</a>`;
                })
                .replace(emailRegex, match => 
                    `<a href="mailto:${match}">${match}</a>`);

            resHTML = addClassToHTML(resHTML, "text-link");

            return resHTML;        
        }
    );

    const addClassToHTML = (html, theClass) => {
        const anchorRegex = /<a\b(?![^>]*\bclass=)[^>]*>|<a\b[^>]*\bclass\s*=\s*(['"])(.*?)\1[^>]*>/gi;
        
        const addClass = match => {
            if (match.includes('class=')) {
                return match.replace(/class\s*=\s*(['"])(.*?)\1/, `class="$1$2 ${theClass}$1`);
            } else {
                return match.replace(/<a\b/, `<a class="${theClass}"`);
            }
        };

        return html.replace(anchorRegex, addClass);
    };

</script>

<style lang="scss">
    .parsed-html{
        h1,
        h2,
        h3,
        h4,
        h5{
            // font-size: 1.8rem;
            margin-top: 1.6em;
            margin-bottom: .8em;
        }

        p{
            margin-bottom: .8em;
        }

        strong{
            font-weight: 700;
        }

        ul, ol{
            margin-left: 10pt;
            margin-bottom: 1rem;
            margin-top: -.8rem;

            li{
                margin-left: 15pt;
            }
        }

        ul{
            list-style: none;
            list-style-type: disc;
        }

        iframe, img{
            max-width: 100%;
        }

        @media (max-width: $mobile) {
            @include font-14;
            h1{@include font-h3;}
            h2{@include font-h4;}
            h3{@include font-h5;}
            h4{@include font-h6;}
            h5{@include font-h6;}
        }
    }
</style>