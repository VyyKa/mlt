import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                function onScroll(){
                  const y = window.scrollY || 0;
                  document.querySelectorAll('[data-speed]')?.forEach(function(el){
                    var speed = parseFloat(el.getAttribute('data-speed')) || 0.2;
                    el.style.transform = 'translate3d(0,' + (y * speed) + 'px,0)';
                  });
                }
                window.addEventListener('scroll', onScroll, { passive: true });
                onScroll();
              })();
            `,
          }}
        />
      </body>
    </Html>
  );
}
