/ *!
 * Bootstrap v3.1.0 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licenciado pelo MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * /

if (typeof jQuery === 'undefined') {throw new Error ('Bootstrap requer jQuery')}

/ * ====================================================== ==========================
 * Bootstrap: transaction.js v3.1.0
 * http://getbootstrap.com/javascript/#transitions
 * ======================================================= =========================
 * Copyright 2011-2014 Twitter, Inc.
 * Licenciado pelo MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================= ========================= * /


+ função ($) {
  'use estrito';

  // SUPORTE DE TRANSIÇÃO CSS (Shoutout: http://www.modernizr.com/)
  // ====================================================== ============

  function transactionEnd () {
    var el = document.createElement ('bootstrap')

    var transEndEventNames = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transactionend',
      'OTransition': 'oTransitionEnd otransitionend',
      'transição': 'transição final'
    }

    para (nome da var em transEndEventNames) {
      if (el.style [nome]! == undefined) {
        return {end: transEndEventNames [nome]}
      }
    }

    retornar falso // explícito para ie8 (._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $ .fn.emulateTransitionEnd = function (duration) {
    var chamado = false, $ el = this
    $ (this) .one ($. support.transition.end, function () {called = true})
    var callback = function () {if (! called) $ ($ el) .trigger ($. support.transition.end)}
    setTimeout (retorno de chamada, duração)
    devolva isso
  }

  $ (function () {
    $ .support.transition = transactionEnd ()
  })

} (jQuery);

/ * ====================================================== ==========================
 * Bootstrap: alert.js v3.1.0
 * http://getbootstrap.com/javascript/#alerts
 * ======================================================= =========================
 * Copyright 2011-2014 Twitter, Inc.
 * Licenciado pelo MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================= ========================= * /


+ função ($) {
  'use estrito';

  // DEFINIÇÃO DE CLASSE DE ALERTA
  // ========================

  var dispensar = '[data-despedir = "alerta"]'
  var Alerta = função (el) {
    $ (el) .on ('clicar', dispensar, this.close)
  }

  Alert.prototype.close = function (e) {
    var $ this = $ (this)
    var selector = $ this.attr ('data-target')

    if (! selector) {
      selector = $ this.attr ('href')
      selector = selector && selector.replace (/.* (? = # [^ \ s] * $) /, '') // tira para ie7
    }

    var $ parent = $ (seletor)

    if (e) e.preventDefault ()

    if (! $ parent.length) {
      $ parent = $ this.hasClass ('alert')? $ this: $ this.parent ()
    }

    $ parent.trigger (e = $ .Event ('close.bs.alert'))

    if (e.isDefaultPrevented ()) return

    $ parent.removeClass ('in')

    function removeElement () {
      $ parent.trigger ('closed.bs.alert'). remove ()
    }

    $ .support.transition && $ parent.hasClass ('fade')?
      $ parent
        .one ($. support.transition.end, removeElement)
        .emulateTransitionEnd (150):
      removeElement ()
  }


  // DEFINIÇÃO DO PLUGIN DE ALERTA
  // =========================

  var old = $ .fn.alert

  $ .fn.alert = função (opção) {
    return this.each (function () {
      var $ this = $ (this)
      var data = $ this.data ('bs.alert')

      if (! data) $ this.data ('bs.alert', (data = new Alert (this)))
      if (typeof option == 'string') data [opção] .call ($ this)
    })
  }

  $ .fn.alert.Constructor = Alerta


  // ALERTA SEM CONFLITO
  // =================

  $ .fn.alert.noConflict = function () {
    $ .fn.alert = old
    devolva isso
  }


  // ALERT DATA-API
  // ==============

  $ (document) .on ('click.bs.alert.data-api', dispense, Alert.prototype.close)

} (jQuery);

/ * ====================================================== ==========================
 * Bootstrap: button.js v3.1.0
 * http://getbootstrap.com/javascript/#buttons
 * ======================================================= =========================
 * Copyright 2011-2014 Twitter, Inc.
 * Licenciado pelo MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================= ========================= * /


+ função ($) {
  'use estrito';

  // BOTÃO DE DEFINIÇÃO DE CLASSE PÚBLICA
  // ================================

  var Botão = função (elemento, opções) {
    este. $ element = $ (elemento)
    this.options = $ .extend ({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.DEFAULTS = {
    loadingText: 'carregando ...'
  }

  Button.prototype.setState = function (state) {
    var d = 'desativado'
    var $ el = this. $ element
    var val = $ el.is ('input')? 'val': 'html'
    var data = $ el.data ()

    estado = estado + 'Texto'

    if (! data.resetText) $ el.data ('resetText', $ el [val] ())

    $ el [val] (dados [estado] || this.options [estado])

    // empurre para o loop de eventos para permitir que os formulários sejam enviados
    setTimeout ($. proxy (function () {
      if (state == 'loadingText') {
        this.isLoading = true
        $ el.addClass (d) .attr (d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $ el.removeClass (d) .removeAttr (d)
      }
    }, este), 0)
  }

  Button.prototype.toggle = function () {
    var alterado = verdadeiro
    var $ parent = this. $ element.closest ('[data-toggle = "buttons"]')

    if ($ parent.length) {
      var $ input = this. $ element.find ('input')
      if ($ input.prop ('type') == 'radio') {
        if ($ input.prop ('verificado') && this. $ element.hasClass ('ativo')) alterado = falso
        else $ parent.find ('. active'). removeClass ('active')
      }
      if (alterado) $ input.prop ('verificado',! this. $ element.hasClass ('ativo')). trigger ('alteração')
    }

    if (alterado) isso. $ element.toggleClass ('ativo')
  }


  // DEFINIÇÃO DO PLUGIN DE BOTÃO
  // ==========================

  var old = $ .fn.button

  $ .fn.button = função (opção) {
    return this.each (function () {
      var $ this = $ (this)
      var data = $ this.data ('bs.button')
      var options = typeof option == 'object' && option

      if (! data) $ this.data ('bs.button', (data = new Button (this, options)))

      if (option == 'toggle') data.toggle ()
      else if (opção) data.setState (opção)
    })
  }

  $ .fn.button.Constructor = Botão


  // BOTÃO SEM CONFLITO
  // ==================

  $ .fn.button.noConflict = function () {
    $ .fn.button = old
    devolva isso
  }


  // BUTTON DATA-API
  // ===============

  $ (document) .on ('click.bs.button.data-api', '[data-toggle ^ = button]', function (e) {
    var $ btn = $ (e.target)
    if (! $ btn.hasClass ('btn')) $ btn = $ btn.closest ('. btn')
    $ btn.button ('toggle')
    e.preventDefault ()
  })

} (jQuery);

/ * ====================================================== ==========================
 * Bootstrap: carousel.js v3.1.0
 * http://getbootstrap.com/javascript/#carousel
 * ======================================================= =========================
 * Copyright 2011-2014 Twitter, Inc.
 * Licenciado pelo MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================= ========================= * /


+ função ($) {
  'use estrito';

  // DEFINIÇÃO DA CLASSE DE CARROSSEL
  // ===========================

  var Carrossel = função (elemento, opções) {
    este. $ element = $ (elemento)
    isto. $ indicadores = isto. $ element.find ('. indicadores de carrossel')
    this.options = opções
    this.paused =
    this.sliding =
    this.interval =
    este. $ active =
    este. $ items = null

    this.options.pause == 'hover' && this. $ element
      .on ('mouseenter', $ .proxy (this.pause, this))
      .on ('mouseleave', $ .proxy (this.cycle, this))
  }

  Carousel.DEFAULTS = {
    intervalo: 5000,
    pausa: 'hover',
    wrap: true
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval (this.interval)

    this.options.interval
      &&! this.paused
      && (this.interval = setInterval ($. proxy (this.next, this), this.options.interval))

    devolva isso
  }

  Carousel.prototype.getActiveIndex = function () {
    this. $ active = this. $ element.find ('. item.active')
    this. $ items = this. $ active.parent (). children ()

    retornar this. $ items.index (this. $ active)
  }

  Carousel.prototype.to = function (pos) {
    var that = this
    var activeIndex = this.getActiveIndex ()

    if (pos> (this. $ items.length - 1) || pos <0) return

    if (this.sliding) return this. $ element.one ('slid.bs.carousel', function () {that.to (pos)})
    if (activeIndex == pos) retorna this.pause (). cycle ()

    return this.slide (pos> activeIndex? 'next': 'prev', $ (this. $ items [pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this. $ element.find ('. next, .prev'). length && $ .support.transition) {
      este. $ element.trigger ($. support.transition.end)
      this.ciclo (verdadeiro)
    }

    this.interval = clearInterval (this.interval)

    devolva isso
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    retornar this.slide ('próximo')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide ('anterior')
  }

  Carousel.prototype.slide = function (type, next) {
    var $ active = this. $ element.find ('. item.active')
    var $ next = next || $ ativo [tipo] ()
    var isCycling = this.interval
    var direction = type == 'next'? 'esquerda direita'
    var fallback = type == 'next'? 'primeiro último'
    var that = this

    if (! $ next.length) {
      if (! this.options.wrap) return
      $ next = this. $ element.find ('. item') [fallback] ()
    }

    if ($ next.hasClass ('active')) return this.sliding = false

    var e = $ .Event ('slide.bs.carousel', {relatedTarget: $ next [0], direction: direction})
    este. $ element.trigger (e)
    if (e.isDefaultPrevented ()) return

    this.sliding = true

    isCycling && this.pause ()

    if (this. $ Indicadores.length) {
      this. $ Indicadores.find ('. ativo'). removeClass ('ativo')
      this. $ element.one ('slid.bs.carousel', function () {
        var $ nextIndicator = $ (that. $ Indicadores.children () [that.getActiveIndex ()])
        $ nextIndicator && $ nextIndicator.addClass ('ativo')
      })
    }

    if ($ .support.transition && this. $ element.hasClass ('slide')) {
      $ next.addClass (tipo)
      $ next [0] .offsetWidth // forçar refluxo
      $ active.addClass (direção)
      $ next.addClass (direção)
      $ ativo
        .one ($. support.transition.end, function () {
          $ next.removeClass ([tipo, direção] .join ('')). addClass ('ativo')
          $ active.removeClass (['ativo', direção] .join (''))
          that.sliding = false
          setTimeout (function () {that. $ element.trigger ('slid.bs.carousel')}, 0)
        })
        .emulateTransitionEnd ($ active.css ('transit-duration'). slice (0, -1) * 1000)
    } outro {
      $ active.removeClass ('ativo')
      $ next.addClass ('ativo')
      this.sliding = false
      este. $ element.trigger ('slid.bs.carousel')
    }

    isCycling && this.cycle ()

    devolva isso
  }


  // DEFINIÇÃO DO CARROSSEL PLUGIN
  // ============================

  var old = $ .fn.carousel

  $ .fn.carousel = function (option) {
    return this.each (function () {
      var $ this = $ (this)
      var data = $ this.data ('bs.carousel')
      var options = $ .extend ({}, Carousel.DEFAULTS, $ this.data (), typeof option == 'object' && option)
      var action = typeof option == 'string'? opção: options.slide

      if (! data) $ this.data ('bs.carousel', (data = new Carousel (this, options)))
      if (typeof option == 'number') data.to (option)
      else if (ação) dados [ação] ()
      else if (options.interval) data.pause (). cycle ()
    })
  }

  $ .fn.carousel.Constructor = Carrossel


  // CARROSSEL SEM CONFLITO
  // ====================

  $ .fn.carousel.noConflict = function () {
    $ .fn.carousel = old
    devolva isso
  }


  // CAROUSEL DATA-API
  // =================

  $ (document) .on ('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $ this = $ (this), href
    var $ target = $ ($ this.attr ('data-target') || (href = $ this.attr ('href')) && href.replace (/.* (? = # [^ \ s] + $) /, '')) // tira para ie7
    var options = $ .extend ({}, $ target.data (), $ this.data ())
    var slideIndex = $ this.attr ('data-slide-to')
    if (slideIndex) options.interval = false

    $ target.carousel (opções)

    if (slideIndex = $ this.attr ('data-slide-to')) {
      $ target.data ('bs.carousel'). to (slideIndex)
    }

    e.preventDefault ()
  })

  $ (janela) .on ('carregar', função () {
    $ ('[data-ride = "carrossel"]'). each (function () {
      var $ carrossel = $ (isto)
      $ carousel.carousel ($ carousel.data ())
    })
  })

} (jQuery);

/ * ====================================================== ==========================
 * Bootstrap: collapse.js v3.1.0
 * http://getbootstrap.com/javascript/#collapse
 * ======================================================= =========================
 * Copyright 2011-2014 Twitter, Inc.
 * Licenciado pelo MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================= ========================= * /


+ função ($) {
  'use estrito';

  // RECOLHER A DEFINIÇÃO DE CLASSE PÚBLICA
  // ====================================

  var Collapse = função (elemento, opções) {
    este. $ element = $ (elemento)
    this.options = $ .extend ({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this. $ parent = $ (this.options.parent)
    if (this.options.toggle) this.toggle ()
  }

  Collapse.DEFAULTS = {
    alternar: verdadeiro
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this. $ element.hasClass ('width')
    return hasWidth? 'largura altura'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this. $ element.hasClass ('in')) return

    var startEvent = $ .Event ('show.bs.collapse')
    este. $ element.trigger (startEvent)
    if (startEvent.isDefaultPrevented ()) return

    var actives = this. $ parent && this. $ parent.find ('> .panel> .in')

    if (actives && actives.length) {
      var hasData = actives.data ('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse ('ocultar')
      hasData || actives.data ('bs.collapse', nulo)
    }

    var dimension = this.dimension ()

    este. $ elemento
      .removeClass ('recolher')
      .addClass ('recolhendo')
      [dimensão] (0)

    this.transitioning = 1

    var complete = function () {
      este. $ elemento
        .removeClass ('recolhendo')
        .addClass ('recolher em')
        [dimensão] ('auto')
      this.transitioning = 0
      este. $ element.trigger ('mostrado.bs.collapse')
    }

    if (! $. support.transition) return complete.call (this)

    var scrollSize = $ .camelCase (['scroll', dimension] .join ('-'))

    este. $ elemento
      .one ($. support.transition.end, $ .proxy (completo, este))
      .emulateTransitionEnd (350)
      [dimensão] (este. $ elemento [0] [scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning ||! this. $ element.hasClass ('in')) return

    var startEvent = $ .Event ('hide.bs.collapse')
    este. $ element.trigger (startEvent)
    if (startEvent.isDefaultPrevented ()) return

    var dimension = this.dimension ()

    este. $ elemento
      [dimensão] (este. $ elemento [dimensão] ())
      [0] .offsetHeight

    este. $ elemento
      .addClass ('recolhendo')
      .removeClass ('recolher')
      .removeClass ('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      este. $ elemento
        .trigger ('hidden.bs.collapse')
        .removeClass ('recolhendo')
        .addClass ('recolher')
    }

    if (! $. support.transition) return complete.call (this)

    este. $ elemento
      [dimensão] (0)
      .one ($. support.transition.end, $ .proxy (completo, este))
      .emulateTransitionEnd (350)
  }

  Collapse.prototype.toggle = function () {
    this [this. $ element.hasClass ('in')? 'ocultar': 'mostrar'] ()
  }


  // COLAPSE PLUGIN DEFINITION
  // ============================

  var old = $ .fn.collapse

  $ .fn.collapse = função (opção) {
    return this.each (function () {
      var $ this = $ (this)
      var data = $ this.data ('bs.collapse')
      var options = $ .extend ({}, Collapse.DEFAULTS, $ this.data (), typeof option == 'object' && option)

      if (! data && options.toggle && option == 'show') option =! opção
      if (! data) $ this.data ('bs.collapse', (data = novo Collapse (this, options)))
      if (typeof option == 'string') data [opção] ()
    })
  }

  $ .fn.collapse.Constructor = Recolher


  // RECOLHER SEM CONFLITO
  // ====================

  $ .fn.collapse.noConflict = function () {
    $ .fn.collapse = old
    devolva isso
  }


  // COLLAPSE DATA-API
  // =================

  $ (document) .on ('click.bs.collapse.data-api', '[data-toggle = collapse]', function (e) {
    var $ this = $ (this), href
    var target = $ this.attr ('data-target')
        || e.preventDefault ()
        || (href = $ this.attr ('href')) && href.replace (/.* (? = # [^ \ s] + $) /, '') // tira para ie7
    var $ target = $ (target)
    var data = $ target.data ('bs.collapse')
    var option = data? 'toggle': $ this.data ()
    var parent = $ this.attr ('data-parent')
    var $ parent = parent && $ (parent)

    if (! data ||! data.transitioning) {
      if ($ parent) $ parent.find ('[data-toggle = collapse] [data-parent = "' + parent + '"]'). not ($ this) .addClass ('recolhido')
      $ this [$ target.hasClass ('in')? 'addClass': 'removeClass'] ('recolhido')
    }

    $ target.collapse (opção)
  })

} (jQuery);

/ * ====================================================== ==========================
 * Bootstrap: dropdown.js v3.1.0
 * http://getbootstrap.com/javascript/#dropdowns
 * ======================================================= =========================
 * Copyright 2011-2014 Twitter, Inc.
 * Licenciado pelo MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================= ========================= * /


+ função ($) {
  'use estrito';

  // DEFINIÇÃO DE CLASSE DE DROPDOWN
  // ===========================

  var backdrop = '.dropdown-backdrop'
  var toggle = '[data-toggle = dropdown]'
  var Dropdown = function (element) {
    $ (elemento) .on ('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $ this = $ (this)

    if ($ this.is ('. disabled,: disabled')) return

    var $ parent = getParent ($ this)
    var isActive = $ parent.hasClass ('open')

    clearMenus ()

    if (! isActive) {
      if ('ontouchstart' em document.documentElement &&! $ parent.closest ('. navbar-nav'). length) {
        // se for móvel, usamos um pano de fundo porque os eventos de clique não delegam
        $ ('<div class = "dropdown-backdrop" />'). insertAfter ($ (this)). on ('click', clearMenus)
      }

      var relatedTarget = {relatedTarget: this}
      $ parent.trigger (e = $ .Event ('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented ()) return

      $ parent
        .toggleClass ('abrir')
        .trigger ('shown.bs.dropdown', relatedTarget)

      $ this.focus ()
    }

    retorna falso
  }

  Dropdown.prototype.keydown = function (e) {
    if (! / (38 | 40 | 27) /. test (e.keyCode)) return

    var $ this = $ (this)

    e.preventDefault ()
    e.stopPropagation ()

    if ($ this.is ('. disabled,: disabled')) return

    var $ parent = getParent ($ this)
    var isActive = $ parent.hasClass ('open')

    if (! isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $ parent.find (toggle) .focus ()
      return $ this.click ()
    }

    var desc = 'li: not (.divider): visible a'
    var $ items = $ parent.find ('[role = menu]' + desc + ', [role = listbox]' + desc)

    if (! $ items.length) return

    var index = $ items.index ($ items.filter (': focus'))

    if (e.keyCode == 38 && index> 0) index-- // up
    if (e.keyCode == 40 && index <$ items.length - 1) index ++ // down
    if (! ~ index) index = 0

    $ items.eq (index) .focus ()
  }

  function clearMenus (e) {
    $ (pano de fundo) .remove ()
    $ (alternar) .each (function () {
      var $ parent = getParent ($ (this))
      var relatedTarget = {relatedTarget: this}
      if (! $ parent.hasClass ('open')) return
      $ parent.trigger (e = $ .Event ('hide.bs.dropdown', relatedTarget))
      if (e.isDefaultPrevented ()) return
      $ parent.removeClass ('open'). trigger ('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent ($ this) {
    var selector = $ this.attr ('data-target')

    if (! selector) {
      selector = $ this.attr ('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace (/.* (? = # [^ \ s] * $) /, '') // tira para ie7
    }

    var $ parent = selector && $ (selector)

    return $ parent && $ parent.length? $ parent: $ this.parent ()
  }


  // DEFINIÇÃO DO PLUGIN DE DROPDOWN
  // ============================

  var old = $ .fn.dropdown

  $ .fn.dropdown = função (opção) {
    return this.each (function () {
      var $ this = $ (this)
      var data = $ this.data ('bs.dropdown')

      if (! data) $ this.data ('bs.dropdown', (data = new Dropdown (this)))
      if (typeof option == 'string') data [opção] .call ($ this)
    })
  }

  $ .fn.dropdown.Constructor = Dropdown


  // DROPDOWN SEM CONFLITO
  // ====================

  $ .fn.dropdown.noConflict = function () {
    $ .fn.dropdown = old
    devolva isso
  }


  // APLICAR AOS ELEMENTOS DE DROPDOWN PADRÃO
  // =======================================

  $ (documento)
    .on ('click.bs.dropdown.data-api', clearMenus)
    .on ('click.bs.dropdown.data-api', '.formulário suspenso', função (e) {e.stopPropagation ()})
    .on ('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on ('keydown.bs.dropdown.data-api', toggle + ', [role = menu], [role = listbox]', Dropdown.prototype.keydown)

} (jQuery);

/ * ====================================================== ==========================
 * Bootstrap: modal.js v3.1.0
 * http://getbootstrap.com/javascript/#modals
 * ======================================================= =========================
 * Copyright 2011-2014 Twitter, Inc.
 * Licenciado pelo MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================= ========================= * /


+ função ($) {
  'use estrito';

  // DEFINIÇÃO DE CLASSE MODAL
  // ========================

  var Modal = função (elemento, opções) {
    this.options = opções
    este. $ element = $ (elemento)
    este. $ pano de fundo =
    this.isShown = null

    if (this.options.remote) {
      este. $ elemento
        .find ('. conteúdo modal')
        .load (this.options.remote, $ .proxy (function () {
          este. $ element.trigger ('carregado.bs.modal')
        }, isto))
    }
  }

  Modal.DEFAULTS = {
    pano de fundo: verdadeiro,
    teclado: verdadeiro,
    mostrar: verdadeiro
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this [! this.isShown? 'show': 'ocultar'] (_ relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e = $ .Event ('show.bs.modal', {relatedTarget: _relatedTarget})

    este. $ element.trigger (e)

    if (this.isShown || e.isDefaultPrevented ()) return

    this.isShown = true

    this.escape ()

    this. $ element.on ('click.dismiss.bs.modal', '[data-despedir = "modal"]', $ .proxy (this.hide, this))

    this.backdrop (function () {
      var transição = $ .support.transition && that. $ element.hasClass ('fade')

      if (! that. $ element.parent (). length) {
        that. $ element.appendTo (document.body) // não move a posição dom modal
      }

      aquele. $ elemento
        .exposição()
        .scrollTop (0)

      if (transição) {
        que. $ element [0] .offsetWidth // força o refluxo
      }

      aquele. $ elemento
        .addClass ('in')
        .attr ('ária-oculto', falso)

      that.enforceFocus ()

      var e = $ .Event ('mostrado.bs.modal', {relatedTarget: _relatedTarget})

      transição?
        que. $ element.find ('. modal-dialog') // espere o modal deslizar para dentro
          .one ($. support.transition.end, function () {
            que. $ element.focus (). trigger (e)
          })
          .emulateTransitionEnd (300):
        que. $ element.focus (). trigger (e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault ()

    e = $ .Evento ('ocultar.bs.modal')

    este. $ element.trigger (e)

    if (! this.isShown || e.isDefaultPrevented ()) return

    this.isShown = false

    this.escape ()

    $ (documento) .off ('focusin.bs.modal')

    este. $ elemento
      .removeClass ('in')
      .attr ('ária-oculto', verdadeiro)
      .off ('click.dismiss.bs.modal')

    $ .support.transition && this. $ element.hasClass ('fade')?
      este. $ elemento
        .one ($. support.transition.end, $ .proxy (this.hideModal, this))
        .emulateTransitionEnd (300):
      this.hideModal ()
  }

  Modal.prototype.enforceFocus = function () {
    $ (documento)
      .off ('focusin.bs.modal') // protege contra loop de foco infinito
      .on ('focusin.bs.modal', $ .proxy (function (e) {
        if (this. $ element [0]! == e.target &&! this. $ element.has (e.target) .length) {
          isso. $ element.focus ()
        }
      }, isto))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this. $ element.on ('keyup.dismiss.bs.modal', $ .proxy (function (e) {
        e.which == 27 && this.hide ()
      }, isto))
    } else if (! this.isShown) {
      this. $ element.off ('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    este. $ element.hide ()
    this.backdrop (function () {
      that.removeBackdrop ()
      isso. $ element.trigger ('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this. $ backdrop && this. $ backdrop.remove ()
    este. $ pano de fundo = nulo
  }

  Modal.prototype.backdrop = function (callback) {
    var animate = this. $ element.hasClass ('fade')? 'desvaneça' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $ .support.transition && animate

      this. $ backdrop = $ ('<div class = "modal-backdrop' + animate + '" />')
        .appendTo (document.body)

      this. $ element.on ('click.dismiss.bs.modal', $ .proxy (function (e) {
        if (e.target! == e.currentTarget) return
        this.options.backdrop == 'estático'
          ? this. $ element [0] .focus.call (this. $ element [0])
          : this.hide.call (this)
      }, isto))

      if (doAnimate) this. $ backdrop [0] .offsetWidth // forçar refluxo

      this. $ backdrop.addClass ('in')

      if (! callback) return

      doAnimate?
        este. $ pano de fundo
          .one ($. support.transition.end, callback)
          .emulateTransitionEnd (150):
        ligar de volta()

    } else if (! this.isShown && this. $ backdrop) {
      this. $ backdrop.removeClass ('in')

      $ .support.transition && this. $ element.hasClass ('fade')?
        este. $ pano de fundo
          .one ($. support.transition.end, callback)
          .emulateTransitionEnd (150):
        ligar de volta()

    } else if (callback) {
      ligar de volta()
    }
  }


  // DEFINIÇÃO DO PLUGIN MODAL
  // =========================

  var old = $ .fn.modal

  $ .fn.modal = function (option, _relatedTarget) {
    return this.each (function () {
      var $ this = $ (this)
      var data = $ this.data ('bs.modal')
      var options = $ .extend ({}, Modal.DEFAULTS, $ this.data (), typeof option == 'object' && option)

      if (! data) $ this.data ('bs.modal', (data = new Modal (this, options)))
      if (typeof option == 'string') data [option] (_ relatedTarget)
      else if (options.show) data.show (_relatedTarget)
    })
  }

  $ .fn.modal.Constructor = Modal


  // MODAL SEM CONFLITO
  // =================

  $ .fn.modal.noConflict = function () {
    $ .fn.modal = old
    devolva isso
  }


  // MODAL DATA-API
  // ==============

  $ (document) .on ('click.bs.modal.data-api', '[data-toggle = "modal"]', function (e) {
    var $ this = $ (this)
    var href = $ this.attr ('href')
    var $ target = $ ($ this.attr ('data-target') || (href && href.replace (/.* (? = # [^ \ s] + $) /, ''))) // tira para ie7
    var option = $ target.data ('bs.modal')? 'toggle': $ .extend ({remote:! / # /. test (href) && href}, $ target.data (), $ this.data ())

    if ($ this.is ('a')) e.preventDefault ()

    $ target
      .modal (opção, este)
      .one ('ocultar', função () {
        $ this.is (': visible') && $ this.focus ()
      })
  })

  $ (documento)
    .on ('show.bs.modal', '.modal', function () {$ (document.body) .addClass ('modal-open')})
    .on ('hidden.bs.modal', '.modal', function () {$ (document.body) .removeClass ('modal-open')})

} (jQuery);

/ * ====================================================== ==========================
 * Bootstrap: tooltip.js v3.1.0
 * http://getbootstrap.com/javascript/#tooltip
 * Inspirado no jQuery.tipsy original de Jason Frame
 * ======================================================= =========================
 * Copyright 2011-2014 Twitter, Inc.
 * Licenciado pelo MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================= ========================= * /


+ função ($) {
  'use estrito';

  // DEFINIÇÃO DE CLASSE PÚBLICA DA TOOLTIP
  // ===================================

  var Dica de ferramenta = função (elemento, opções) {
    this.type =
    this.options =
    this.enabled =
    this.timeout =
    this.hoverState =
    este. $ element = null

    this.init ('dica', elemento, opções)
  }

  Tooltip.DEFAULTS = {
    animação: verdadeiro,
    colocação: 'superior',
    seletor: falso,
    modelo: '<div class = "tooltip"> <div class = "tooltip-arrow"> </div> <div class = "tooltip-inner"> </div> </div>',
    gatilho: 'foco instantâneo',
    título: '',
    atraso: 0,
    html: false,
    container: false
  }

  Tooltip.prototype.init = função (tipo, elemento, opções) {
    this.enabled = true
    this.type = type
    este. $ element = $ (elemento)
    this.options = this.getOptions (opções)

    var triggers = this.options.trigger.split ('')

    para (var i = triggers.length; i--;) {
      var trigger = triggers [i]

      if (trigger == 'click') {
        this. $ element.on ('click.' + this.type, this.options.selector, $ .proxy (this.toggle, this))
      } else if (trigger! = 'manual') {
        var eventIn = trigger == 'hover'? 'mouseenter': 'focusin'
        var eventOut = trigger == 'hover'? 'mouseleave': 'focusout'

        this. $ element.on (eventIn + '.' + this.type, this.options.selector, $ .proxy (this.enter, this))
        this. $ element.on (eventOut + '.' + this.type, this.options.selector, $ .proxy (this.leave, this))
      }
    }

    this.options.selector?
      (this._options = $ .extend ({}, this.options, {trigger: 'manual', seletor: ''})):
      this.fixTitle ()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = função (opções) {
    options = $ .extend ({}, this.getDefaults (), this. $ element.data (), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        ocultar: opções.delay
      }
    }

    opções de retorno
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options = {}
    var defaults = this.getDefaults ()

    this._options && $ .each (this._options, function (key, value) {
      if (padrões [chave]! = valor) opções [chave] = valor
    })

    opções de retorno
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor?
      obj: $ (obj.currentTarget) [this.type] (this.getDelegateOptions ()). data ('bs.' + this.type)

    clearTimeout (self.timeout)

    self.hoverState = 'em'

    if (! self.options.delay ||! self.options.delay.show) retorna self.show ()

    self.timeout = setTimeout (function () {
      if (self.hoverState == 'in') self.show ()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor?
      obj: $ (obj.currentTarget) [this.type] (this.getDelegateOptions ()). data ('bs.' + this.type)

    clearTimeout (self.timeout)

    self.hoverState = 'out'

    if (! self.options.delay ||! self.options.delay.hide) retorna self.hide ()

    self.timeout = setTimeout (function () {
      if (self.hoverState == 'out') self.hide ()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $ .Event ('show.bs.' + this.type)

    if (this.hasContent () && this.enabled) {
      este. $ element.trigger (e)

      if (e.isDefaultPrevented ()) return
      var that = this;

      var $ tip = this.tip ()

      this.setContent ()

      if (this.options.animation) $ tip.addClass ('fade')

      var placement = typeof this.options.placement == 'function'?
        this.options.placement.call (this, $ tip [0], this. $ element [0]):
        this.options.placement

      var autoToken = / \ s? auto? \ s? / i
      var autoPlace = autoToken.test (colocação)
      if (autoPlace) placement = placement.replace (autoToken, '') || 'principal'

      $ dica
        .detach ()
        .css ({top: 0, left: 0, display: 'block'})
        .addClass (colocação)

      this.options.container? $ tip.appendTo (this.options.container): $ tip.insertAfter (this. $ element)

      var pos = this.getPosition ()
      var actualWidth = $ tip [0] .offsetWidth
      var actualHeight = $ tip [0] .offsetHeight

      if (autoPlace) {
        var $ parent = this. $ element.parent ()

        var orgPlacement = placement
        var docScroll = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth = this.options.container == 'body'? window.innerWidth: $ parent.outerWidth ()
        var parentHeight = this.options.container == 'body'? window.innerHeight: $ parent.outerHeight ()
        var parentLeft = this.options.container == 'body'? 0: $ parent.offset (). Left

        colocação = colocação == 'bottom' && pos.top + pos.height + actualHeight - docScroll> parentHeight? 'principal' :
                    colocação == 'top' && pos.top - docScroll - actualHeight <0? 'fundo' :
                    colocação == 'direita' && pos.right + actualWidth> parentWidth? 'deixou' :
                    colocação == 'left' && pos.left - actualWidth <parentLeft? 'direito' :
                    colocação

        $ dica
          .removeClass (orgPlacement)
          .addClass (colocação)
      }

      var CalculatedOffset = this.getCalculatedOffset (placement, pos, actualWidth, actualHeight)

      this.applyPlacement (associatedOffset, placement)
      this.hoverState = null

      var complete = function () {
        aquele. $ element.trigger ('mostrado.bs.' + aquele.tipo)
      }

      $ .support.transition && this. $ tip.hasClass ('fade')?
        $ dica
          .one ($. support.transition.end, completo)
          .emulateTransitionEnd (150):
        completo()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var substituir
    var $ tip = this.tip ()
    var width = $ tip [0] .offsetWidth
    var height = $ tip [0] .offsetHeight

    // leia manualmente as margens porque getBoundingClientRect inclui diferença
    var marginTop = parseInt ($ tip.css ('margin-top'), 10)
    var marginLeft = parseInt ($ tip.css ('margin-left'), 10)

    // devemos verificar se há NaN por exemplo, 09/08
    if (isNaN (marginTop)) marginTop = 0
    if (isNaN (marginLeft)) marginLeft = 0

    offset.top = offset.top + marginTop
    offset.left = offset.left + marginLeft

    // $ .fn.offset não arredonda os valores dos pixels
    // então usamos setOffset diretamente com nossa própria função B-0
    $ .offset.setOffset ($ tip [0], $ .extend ({
      usando: função (adereços) {
        $ tip.css ({
          topo: Math.round (props.top),
          esquerda: Math.round (props.left)
        })
      }
    }, deslocamento), 0)

    $ tip.addClass ('in')

    // verifique se colocar a ponta em um novo deslocamento fez com que a ponta se redimensionasse
    var actualWidth = $ tip [0] .offsetWidth
    var actualHeight = $ tip [0] .offsetHeight

    if (colocação == 'top' && actualHeight! = altura) {
      substituir = verdadeiro
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left <0) {
        delta = offset.left * -2
        offset.left = 0

        $ tip.offset (deslocamento)

        actualWidth = $ tip [0] .offsetWidth
        actualHeight = $ tip [0] .offsetHeight
      }

      this.replaceArrow (delta - largura + largura atual, largura atual, 'esquerda')
    } outro {
      this.replaceArrow (actualHeight - height, actualHeight, 'top')
    }

    if (substituir) $ tip.offset (offset)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimensão, posição) {
    this.arrow (). css (posição, delta? (50 * (1 - delta / dimensão) + '%'): '')
  }

  Tooltip.prototype.setContent = function () {
    var $ tip = this.tip ()
    var title = this.getTitle ()

    $ tip.find ('. tooltip-inner') [this.options.html? 'html': 'texto'] (título)
    $ tip.removeClass ('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $ tip = this.tip ()
    var e = $ .Event ('ocultar.bs.' + este.tipo)

    function complete () {
      if (that.hoverState! = 'in') $ tip.detach ()
      aquele. $ element.trigger ('hidden.bs.' + aquele.tipo)
    }

    este. $ element.trigger (e)

    if (e.isDefaultPrevented ()) return

    $ tip.removeClass ('in')

    $ .support.transition && this. $ tip.hasClass ('fade')?
      $ dica
        .one ($. support.transition.end, completo)
        .emulateTransitionEnd (150):
      completo()

    this.hoverState = null

    devolva isso
  }

  Tooltip.prototype.fixTitle = function () {
    var $ e = this. $ element
    if ($ e.attr ('title') || typeof ($ e.attr ('data-original-title'))! = 'string') {
      $ e.attr ('data-original-title', $ e.attr ('title') || '') .attr ('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle ()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this. $ element [0]
    return $ .extend ({}, (typeof el.getBoundingClientRect == 'function')? el.getBoundingClientRect (): {
      largura: el.offsetWidth,
      altura: el.offsetHeight
    }, isso. $ element.offset ())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    voltar a colocação == 'inferior'? {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}:
           colocação == 'superior'? {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}:
           colocação == 'esquerda'? {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}:
        / * placement == 'right' * / {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
  }

  Tooltip.prototype.getTitle = function () {
    título var
    var $ e = this. $ element
    var o = this.options

    title = $ e.attr ('data-original-title')
      || (typeof o.title == 'function'? o.title.call ($ e [0]): o.title)

    título de retorno
  }

  Tooltip.prototype.tip = function () {
    retornar this. $ tip = this. $ tip || $ (this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    retornar isso. $ arrow = isso. $ arrow || this.tip (). find ('. tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (! this. $ element [0] .parentNode) {
      this.hide ()
      este. $ element = null
      this.options = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled =! this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e? $ (e.currentTarget) [this.type] (this.getDelegateOptions ()). data ('bs.' + this.type): este
    self.tip (). hasClass ('in')? self.leave (self): self.enter (self)
  }

  Tooltip.prototype.destroy = function () {
    clearTimeout (this.timeout)
    this.hide (). $ element.off ('.' + this.type) .removeData ('bs.' + this.type)
  }


  // DEFINIÇÃO DO TOOLTIP PLUGIN
  // ===========================

  var old = $ .fn.tooltip

  $ .fn.tooltip = função (opção) {
    return this.each (function () {
      var $ this = $ (this)
      var data = $ this.data ('bs.tooltip')
      var options = typeof option == 'object' && option

      if (! data && option == 'destroy') return
      if (! data) $ this.data ('bs.tooltip', (data = new Tooltip (this, options)))
      if (typeof option == 'string') data [opção] ()
    })
  }

  $ .fn.tooltip.Constructor = Dica de ferramenta


  // TOOLTIP SEM CONFLITO
  // ===================

  $ .fn.tooltip.noConflict = function () {
    $ .fn.tooltip = old
    devolva isso
  }

} (jQuery);

/ * ====================================================== ==========================
 * Bootstrap: popover.js v3.1.0
 * http://getbootstrap.com/javascript/#popovers
 * ======================================================= =========================
 * Copyright 2011-2014 Twitter, Inc.
 * Licenciado pelo MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================= ========================= * /


+ função ($) {
  'use estrito';

  // DEFINIÇÃO DE CLASSE PÚBLICA DE POPOVER
  // ===================================

  var Popover = função (elemento, opções) {
    this.init ('popover', elemento, opções)
  }

  if (! $. fn.tooltip) throw new Error ('Popover requer tooltip.js')

  Popover.DEFAULTS = $ .extend ({}, $ .fn.tooltip.Constructor.DEFAULTS, {
    posicionamento: 'direito',
    gatilho: 'clique',
    contente: '',
    modelo: '<div class = "popover"> <div class = "arrow"> </div> <h3 class = "popover-title"> </h3> <div class = "popover-content"> </ div > </div> '
  })


  // NOTA: POPOVER EXTENDS tooltip.js
  // ====================================

  Popover.prototype = $ .extend ({}, $ .fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    retornar Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $ tip = this.tip ()
    var title = this.getTitle ()
    var content = this.getContent ()

    $ tip.find ('. popover-title') [this.options.html? 'html': 'texto'] (título)
    $ tip.find ('. popover-content') [// usamos append para objetos html para manter eventos js
      this.options.html? (typeof content == 'string'? 'html': 'anexar'): 'texto'
    ](contente)

    $ tip.removeClass ('fade top bottom left right in')

    // IE8 não aceita ocultar por meio do pseudo seletor `: empty`, temos que fazer
    // isso manualmente verificando o conteúdo.
    if (! $ tip.find ('. popover-title'). html ()) $ tip.find ('. popover-title'). hide ()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle () || this.getContent ()
  }

  Popover.prototype.getContent = function () {
    var $ e = this. $ element
    var o = this.options

    return $ e.attr ('data-content')
      || (typeof o.content == 'função'?
            o.content.call ($ e [0]):
            o.content)
  }

  Popover.prototype.arrow = function () {
    retornar isso. $ arrow = isso. $ arrow || this.tip (). find ('. arrow')
  }

  Popover.prototype.tip = function () {
    if (! this. $ tip) this. $ tip = $ (this.options.template)
    devolva este. $ tip
  }


  // DEFINIÇÃO DO PLUGIN DE POPOVER
  // ===========================

  var old = $ .fn.popover

  $ .fn.popover = função (opção) {
    return this.each (function () {
      var $ this = $ (this)
      var data = $ this.data ('bs.popover')
      var options = typeof option == 'object' && option

      if (! data && option == 'destroy') return
      if (! data) $ this.data ('bs.popover', (data = new Popover (this, options)))
      if (typeof option == 'string') data [opção] ()
    })
  }

  $ .fn.popover.Constructor = Popover


  // POPOVER SEM CONFLITO
  // ===================

  $ .fn.popover.noConflict = function () {
    $ .fn.popover = old
    devolva isso
  }

} (jQuery);

/ * ====================================================== ==========================
 * Bootstrap: scrollspy.js v3.1.0
 * http://getbootstrap.com/javascript/#scrollspy
 * ======================================================= =========================
 * Copyright 2011-2014 Twitter, Inc.
 * Licenciado pelo MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================= ========================= * /


+ função ($) {
  'use estrito';

  // DEFINIÇÃO DE CLASSE DE ROLAGEM
  // ============================

  function ScrollSpy (elemento, opções) {
    var href
    var process = $ .proxy (this.process, this)

    this. $ element = $ (element) .is ('body')? $ (janela): $ (elemento)
    este. $ body = $ ('body')
    this. $ scrollElement = this. $ element.on ('scroll.bs.scroll-spy.data-api', processo)
    this.options = $ .extend ({}, ScrollSpy.DEFAULTS, opções)
    this.selector = (this.options.target
      || ((href = $ (elemento) .attr ('href')) && href.replace (/.* (? = # [^ \ s] + $) /, '')) // tira para ie7
      || '') + '.nav li> a'
    this.offsets = $ ([])
    this.targets = $ ([])
    this.activeTarget = null

    this.refresh ()
    Este processo()
  }

  ScrollSpy.DEFAULTS = {
    deslocamento: 10
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this. $ element [0] == window? 'deslocamento': 'posição'

    this.offsets = $ ([])
    this.targets = $ ([])

    var self = this
    var $ targets = this. $ body
      .find (this.selector)
      .map (function () {
        var $ el = $ (isto)
        var href = $ el.data ('target') || $ el.attr ('href')
        var $ href = /^#./.test(href) && $ (href)

        return ($ href
          && $ href.length
          && $ href.is (': visible')
          && [[$ href [offsetMethod] (). top + (! $. isWindow (self. $ scrollElement.get (0)) && self. $ scrollElement.scrollTop ()), href]]) || nulo
      })
      .sort (função (a, b) {return a [0] - b [0]})
      .each (function () {
        self.offsets.push (este [0])
        self.targets.push (este [1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop = this. $ scrollElement.scrollTop () + this.options.offset
    var scrollHeight = this. $ scrollElement [0] .scrollHeight || este. $ body [0] .scrollHeight
    var maxScroll = scrollHeight - isto. $ scrollElement.height ()
    var offsets = this.offsets
    var targets = this.targets
    var activeTarget = this.activeTarget
    var i

    if (scrollTop> = maxScroll) {
      return activeTarget! = (i = targets.last () [0]) && this.activate (i)
    }

    if (activeTarget && scrollTop <= offsets [0]) {
      return activeTarget! = (i = targets [0]) && this.activate (i)
    }

    para (i = offsets.length; i--;) {
      activeTarget! = alvos [i]
        && scrollTop> = deslocamentos [i]
        && (! deslocamentos [i + 1] || scrollTop <= deslocamentos [i + 1])
        && this.activate (alvos [i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $ (this.selector)
      .parentsUntil (this.options.target, '.active')
      .removeClass ('ativo')

    var selector = this.selector +
        '[data-target = "' + target + '"],' +
        this.selector + '[href = "' + target + '"]'

    var ativo = $ (seletor)
      .parents ('li')
      .addClass ('ativo')

    if (active.parent ('. dropdown-menu'). length) {
      ativo = ativo
        .closest ('li.dropdown')
        .addClass ('ativo')
    }

    active.trigger ('activate.bs.scrollspy')
  }


  // DEFINIÇÃO DO PLUGIN DE ROLAGEM
  // ===============================

  var old = $ .fn.scrollspy

  $ .fn.scrollspy = função (opção) {
    return this.each (function () {
      var $ this = $ (this)
      var data = $ this.data ('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (! data) $ this.data ('bs.scrollspy', (data = new ScrollSpy (this, options)))
      if (typeof option == 'string') data [opção] ()
    })
  }

  $ .fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY SEM CONFLITO
  // =======================

  $ .fn.scrollspy.noConflict = function () {
    $ .fn.scrollspy = old
    devolva isso
  }


  // SCROLLSPY DATA-API
  // ==================

  $ (janela) .on ('carregar', função () {
    $ ('[data-spy = "scroll"]'). each (function () {
      var $ spy = $ (este)
      $ spy.scrollspy ($ spy.data ())
    })
  })

} (jQuery);

/ * ====================================================== ==========================
 * Bootstrap: tab.js v3.1.0
 * http://getbootstrap.com/javascript/#tabs
 * ======================================================= =========================
 * Copyright 2011-2014 Twitter, Inc.
 * Licenciado pelo MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================= ========================= * /


+ função ($) {
  'use estrito';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = função (elemento) {
    this.element = $ (elemento)
  }

  Tab.prototype.show = function () {
    var $ this = this.element
    var $ ul = $ this.closest ('ul: not (.dropdown-menu)')
    var selector = $ this.data ('target')

    if (! selector) {
      selector = $ this.attr ('href')
      selector = selector && selector.replace (/.* (? = # [^ \ s] * $) /, '') // tira para ie7
    }

    if ($ this.parent ('li'). hasClass ('ativo')) return

    var anterior = $ ul.find ('. ativo: último a') [0]
    var e = $ .Event ('show.bs.tab', {
      relatedTarget: anterior
    })

    $ this.trigger (e)

    if (e.isDefaultPrevented ()) return

    var $ target = $ (seletor)

    this.activate ($ this.parent ('li'), $ ul)
    this.activate ($ target, $ target.parent (), function () {
      $ this.trigger ({
        tipo: 'mostrado.bs.tab',
        relatedTarget: anterior
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $ active = container.find ('> .active')
    transição var = retorno de chamada
      && $ .support.transition
      && $ active.hasClass ('fade')

    function next () {
      $ ativo
        .removeClass ('ativo')
        .find ('>. menu suspenso> .ativo')
        .removeClass ('ativo')

      element.addClass ('ativo')

      if (transição) {
        elemento [0] .offsetWidth // refluxo para transição
        element.addClass ('in')
      } outro {
        element.removeClass ('fade')
      }

      if (element.parent ('. menu suspenso')) {
        element.closest ('li.dropdown'). addClass ('ativo')
      }

      callback && callback ()
    }

    transição?
      $ ativo
        .one ($. support.transition.end, próximo)
        .emulateTransitionEnd (150):
      próximo()

    $ active.removeClass ('in')
  }


  // TAB PLUGIN DEFINITION
  // =======================

  var old = $ .fn.tab

  $ .fn.tab = função (opção) {
    return this.each (function () {
      var $ this = $ (this)
      var data = $ this.data ('bs.tab')

      if (! data) $ this.data ('bs.tab', (data = new Tab (this)))
      if (typeof option == 'string') data [opção] ()
    })
  }

  $ .fn.tab.Constructor = Tab


  // TAB SEM CONFLITO
  // ===============

  $ .fn.tab.noConflict = function () {
    $ .fn.tab = old
    devolva isso
  }


  // TAB DATA-API
  // ============

  $ (document) .on ('click.bs.tab.data-api', '[data-toggle = "tab"], [data-toggle = "pill"]', function (e) {
    e.preventDefault ()
    $ (this) .tab ('show')
  })

} (jQuery);

/ * ====================================================== ==========================
 * Bootstrap: affix.js v3.1.0
 * http://getbootstrap.com/javascript/#affix
 * ======================================================= =========================
 * Copyright 2011-2014 Twitter, Inc.
 * Licenciado pelo MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================= ========================= * /


+ função ($) {
  'use estrito';

  // AFFIX CLASS DEFINITION
  // ========================

  var Affix = function (elemento, opções) {
    this.options = $ .extend ({}, Affix.DEFAULTS, opções)
    isto. $ window = $ (janela)
      .on ('scroll.bs.affix.data-api', $ .proxy (this.checkPosition, this))
      .on ('click.bs.affix.data-api', $ .proxy (this.checkPositionWithEventLoop, this))

    este. $ element = $ (elemento)
    this.affixed =
    this.unpin =
    this.pinnedOffset = null

    this.checkPosition ()
  }

  Affix.RESET = 'afixo afixo superior afixo inferior'

  Affix.DEFAULTS = {
    deslocamento: 0
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) retorna this.pinnedOffset
    this. $ element.removeClass (Affix.RESET) .addClass ('affix')
    var scrollTop = this. $ window.scrollTop ()
    var position = this. $ element.offset ()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout ($. proxy (this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (! this. $ element.is (': visible')) return

    var scrollHeight = $ (documento) .height ()
    var scrollTop = this. $ window.scrollTop ()
    var position = this. $ element.offset ()
    var offset = this.options.offset
    var offsetTop = offset.top
    var offsetBottom = offset.bottom

    if (this.affixed == 'top') position.top + = scrollTop

    if (typeof offset! = 'object') offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function') offsetTop = offset.top (this. $ elemento)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom (this. $ element)

    var affix = this.unpin! = null && (scrollTop + this.unpin <= position.top)? falso:
                offsetBottom! = null && (position.top + this. $ element.height ()> = scrollHeight - offsetBottom)? 'fundo' :
                offsetTop! = null && (scrollTop <= offsetTop)? 'top': falso

    if (this.affixed === affix) return
    if (this.unpin) this. $ element.css ('top', '')

    var affixType = 'afixo' + (afixo? '-' + afixo: '')
    var e = $ .Event (affixType + '.bs.affix')

    este. $ element.trigger (e)

    if (e.isDefaultPrevented ()) return

    this.affixed = afixo
    this.unpin = affix == 'bottom'? this.getPinnedOffset (): null

    este. $ elemento
      .removeClass (Affix.RESET)
      .addClass (affixType)
      .trigger ($. Event (affixType.replace ('afixo', 'afixado')))

    if (afixo == 'inferior') {
      this. $ element.offset ({top: scrollHeight - offsetBottom - this. $ element.height ()})
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =========================

  var old = $ .fn.affix

  $ .fn.affix = função (opção) {
    return this.each (function () {
      var $ this = $ (this)
      var data = $ this.data ('bs.affix')
      var options = typeof option == 'object' && option

      if (! data) $ this.data ('bs.affix', (data = new Affix (this, options)))
      if (typeof option == 'string') data [opção] ()
    })
  }

  $ .fn.affix.Constructor = Affix


  // AFIXE SEM CONFLITO
  // =================

  $ .fn.affix.noConflict = function () {
    $ .fn.affix = old
    devolva isso
  }


  // AFFIX DATA-API
  // ==============

  $ (janela) .on ('carregar', função () {
    $ ('[data-spy = "afixo"]'). each (function () {
      var $ spy = $ (este)
      var data = $ spy.data ()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop) data.offset.top = data.offsetTop

      $ spy.affix (dados)
    })
  })

} (jQuery);