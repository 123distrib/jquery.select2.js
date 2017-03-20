$(document).ready(function(e) {

	/*
	$(this).on('click','.btn-filter',function() {
		$('.form-filters').css('display','block');
		$('.form-filters input:eq(0)').focus();
		return false;
	});
	
	$(this).on('click','.form-filters input',function() {
		return false;
	});
	*/
	
	$(this).on('mousedown',function() {
		$('.subselect').css('display','none');
		$('.form-filters').css('display','none');
	});
}); 


(function($){
	// ajax
	$.fn.disabled = function(options) {
		$(this).parent('div').css('opacity','0.6');
	}
	
	$.fn.select2 = function(options) {
		// valeurs par defaut
		var defaults = { 
			noLazy : false,
		}; 
	
	$('sel:not([bypass]),select:not([bypass]):not([multiple="multiple"])').each(function() {
	
		var inputNode = $('<input type="hidden" name="'+$(this).attr('name')+'" id="'+$(this).attr('name')+'" href="'+$(this).attr('href')+'" target="'+$(this).attr('target')+'" selected-value="" />');
		
		var selects = '';
	
		var divSelect = $('<div class="select"><div class="select_inner"></div></div>');
		
		var inputSelected = $(this).children('opt[selected="selected"],option[selected="selected"]');
		
		if(inputSelected.length != 0) {
			
			var placeholder = inputSelected.html();
			inputNode.val(inputSelected.attr('value'));
			
			inputNode.attr('selected-value',inputSelected.text());
		} else {
			var placeholder = $(this).attr('placeholder');
		}
		
		var divNode = $('<div class="select2" tabindex="0"><i class="icon-right-open"></i> <span>'+placeholder+'</span></div>');
		
		if($(this).css('min-width') != '0px') {
			divNode.css('min-width',$(this).css('min-width'));
		}
		
		
		// on construit les opts	
		$(this).children('opt,option').each(function() {
						
			var href = '';
			if($(this).attr('href')) {
				var href = $(this).attr('href');
			}
			var target = '';
			if($(this).attr('target')) {
				var target = $(this).attr('target');
			}
			
			selects += '<a href="'+href+'" target="'+target+'" tabindex="0" tab-value="'+$(this).attr('value')+'">'+$(this).html()+'</a>';
		});
		
		// on construit la selection
		if($(this).attr('search-bypass')) {
			var searchInput = $('<input type="text" placeholder="Rechercher ..." />');
		} else {
			var searchInput = $('<input type="hidden" placeholder="Rechercher ..." />');
		}
		
		var subdivNode = $('<div class="subselect"></div>');
		var subdivNode2 = $('<div class="scrollable scrollable-shadow subscroolable">'+selects+'</div>');
		
		/*
		searchInput.on('click',function() {
			return false;
		});*/
		
		// on ajoute le tout au html
		$(this).before(divSelect);
		$(divSelect).append(divNode);
		$(subdivNode).prepend(subdivNode2);
		$(subdivNode).prepend(searchInput);
		$(divSelect).append(subdivNode);
		$(divSelect).append(inputNode);
		
		searchInput.on('click',function(e) {
    		//e.stopPropagation();
			//return false;
		});
		
		searchInput.on('mousedown',function(e) {
    		e.stopPropagation();
			//return false;
		});
		
		searchInput.on('keyup',function() {
			subdivNode2.children('a').css('display','none'); 
			subdivNode2.find("a:caseSensitive('"+$(this).val()+"')").css('display','block').addClass('test');  
		});
		  
		var target = $(this).attr('target');
	
		subdivNode.children('div').children('a').on('mouseover',function() {
			$(this).addClass('hover');
		});
		
		subdivNode.children('div').children('a').on('mouseout',function() {
			$(this).removeClass('hover');
		});
		
		
		subdivNode.children('div').children('a').on('click',function() {
			subdivNode.css('display','none');
			inputNode.val($(this).attr('tab-value'));
			
			inputNode.attr('selected-value',$(this).text());
			divNode.children('div span').html($(this).html());
			inputNode.change();
			$(divNode).focus();
    		//e.stopPropagation();
			return false;
		});
		
		
		subdivNode.children('div').children('a').on('mousedown',function(e) {
			subdivNode.css('display','none');
			inputNode.val($(this).attr('tab-value'));
			
			inputNode.attr('selected-value',$(this).text());
			divNode.children('div span').html($(this).html());
			inputNode.change();
			$(divNode).focus();
			//alert(divNode.length);
    		e.stopPropagation();
			return false;
		});
		
		subdivNode.children('div').children('a').on('mouseup',function() {
			subdivNode.css('display','none');
			inputNode.val($(this).attr('tab-value'));
			
			inputNode.attr('selected-value',$(this).text());
			divNode.children('div span').html($(this).html());
			inputNode.change();
			//alert(divNode.length);
			//$(divNode).focus();
			
			
			/*
			if($(this).children('span').html() == 'delete-list') {
				
				if(confirm('Voulez vous supprimer toute la liste ?')) {
					$('.testsetsets').pages({urlTarget:$(this).attr('href'),suppData:'&delete=yes&full=1'});
				} else {
					$('.testsetsets').pages({urlTarget:$(this).attr('href'),suppData:'&delete=yes'});
				}
			} else if($(this).children('span').html() == 'sent-queue') {
				$('.sentqueue').css('display','block');
			} else if($(this).children('span').html() == 'change-folder') {
				$('.changefolder').css('display','block');
			
			} else if(inputNode.val() == 'export_csv') {
			} else if(inputNode.val() == 'delete') {
				
			}
*/
			
			return false;
		});
		
	/*
		$(document).on('keydown',function(e) {
			if(e.which == 27) {
				subdivNode.css('display','none');
				$(divNode).focus();
				return false;
			}
		});
		*/
	
		$(subdivNode).on('keyup',function(e) {
			if(e.which == 27) {
				subdivNode.css('display','none');
				$(divNode).focus();
				return false;
			}
		});
	
		$(divNode).on('keyup',function(e) {
			if(e.which == 27) {
				subdivNode.css('display','none');
				$(divNode).focus();
			}
		});
		
		$(subdivNode).on('keydown',function(e) {
			if(e.which == 38) {
				var eq = subdivNode2.children('a:focus').prev();
				eq.focus();
				return false;
			}
			
			if(e.which == 40) {
				if(!subdivNode2.children('a').is(':focus')) {
					subdivNode2.children('a:visible:eq(0)').focus();	
				} else {
					var eq = subdivNode2.children('a:visible:focus').next();
					eq.focus();
				}
				return false;
			}
		});

		$(divNode).on('keydown',function(e) {
			if(e.which == 40) {
				subdivNode.show();
				subdivNode2.children('a:eq(0)').focus();
				return false;
			}
			if(e.which == 38) {
				subdivNode.show();
				var eq = subdivNode2.children('div').length - 1;
				subdivNode2.children('a:eq('+eq+')').focus();
				return false;
			}
			if(e.which == 13) {
				if(subdivNode.css('display') == 'block') {
					subdivNode.hide();
				} else {
					subdivNode.show();
					searchInput.focus();
					return false;
				}
			}
		});
	
		divNode.on('mousedown',function(e) {
			$('.subselect').not(subdivNode).hide();
			subdivNode.toggle();
			//searchInput.focus();
			$(divNode).focus();
    		e.stopPropagation();
			return false;
		});
		
		/*
		$(subdivNode2).find('a').on('keypress',function(e) {
			if(e.which == 13) {
				$(this).trigger("click");
				$(divNode).focus();
			}
		});
		*/
		
		$(this).remove();
	});
};	



	$.extend($.expr[":"], {
		"caseSensitive": function(elem, i, match, array) {
		return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
	}
	});
})(jQuery);