/* Bazar Vitória — interações da página */
(function () {
  'use strict';

  var WHATSAPP = '5521989661166';

  var cabecalho = document.querySelector('.cabecalho');
  var menu = document.getElementById('menu');
  var toggle = document.getElementById('menuToggle');

  // Cabeçalho muda ao rolar
  function aoRolar() {
    cabecalho.classList.toggle('cabecalho--rolado', window.scrollY > 40);
  }
  aoRolar();
  window.addEventListener('scroll', aoRolar, { passive: true });

  // Menu mobile
  function fecharMenu() {
    menu.classList.remove('aberto');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', function () {
    var aberto = menu.classList.toggle('aberto');
    toggle.setAttribute('aria-expanded', String(aberto));
  });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', fecharMenu); });

  // Revelar elementos ao entrar na tela
  var itens = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visivel');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    itens.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 90 + 'ms';
      obs.observe(el);
    });
  } else {
    itens.forEach(function (el) { el.classList.add('visivel'); });
  }

  // Formulário -> WhatsApp
  var form = document.getElementById('formOrcamento');
  var erro = document.getElementById('formErro');
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var nome = form.nome.value.trim();
    var servico = form.servico.value;
    var mensagem = form.mensagem.value.trim();

    if (!nome || !servico) {
      erro.hidden = false;
      return;
    }
    erro.hidden = true;

    var texto = 'Olá! Meu nome é ' + nome + '.\n' +
      'Gostaria de um orçamento de: ' + servico + '.' +
      (mensagem ? '\nDetalhes: ' + mensagem : '');
    window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
  });
})();
