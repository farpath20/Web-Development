	// Let's start writing AJAX calls!
	var ul = $('#showList'),
		div = $('#show'),
		form= $('#searchForm'),
		input = $('#search_term');
		aTag = $('#homeLink')
		

	$(document).ready(function(){
		var currentLink = $(this);

		ul.hide();
		aTag.hide()
		var currentId = currentLink.data('id');
		var requestConfig = {
			method: 'GET',
			url: '/shows'
		}
		/*$.ajax(requestConfig).then(function(responseMessage) {
			var newElement = $(responseMessage);
			bindEventsToTodoItem(newElement);
			todoItem.replaceWith(newElement);
		});*/
		
		$.ajax(requestConfig).then(function(responseMessage){
			for(const i of responseMessage)
			{
				//console.log("Hey");
				//console.log(i);
				$("#showList").append("<li><a href ="+'/shows/'+i["id"]+">"+i["name"]+"</a></li>");
				
				
				
			}
			$('ul#showList li a').click(
				function(event){
					event.preventDefault();
					ul.hide();
					div.empty();
					let path = 
					console.log($(this).attr('href'))
					var requestConfig = {
						method: 'GET',
						url: $(this).attr('href')
					}
					$.ajax(requestConfig).then(function(responseMessage)
					{
						console.log(responseMessage["language"]);
						div.append("<h1>"+responseMessage["name"]+"</h1>");
						if(responseMessage["image"])
						{
							div.append("<img src="+responseMessage["image"]["medium"]+">");
						}
						else
						{
							//div.append(`<img src=no_images.jpeg>`);
						}
						div.append("<dl></dl>");
						if(responseMessage["language"])
						{
						$("dl").append("<dt>Language</dt><dd>"+ responseMessage["language"]+"</dd>")
						}
						else{
							$("dl").append("<dt>Language</dt><dd>N/A</dd>")
						}
						if(responseMessage["genres"])
						{
							$("dl").append("<dt>Genre</dt><dd>"+ responseMessage["genres"]+"</dd>")
						}
						else
						{
							$("dl").append("<dt>Genre</dt><dd>N/A</dd>")
						}
						if(responseMessage["rating"])
						{
							$("dl").append("<dt>Average Rating</dt><dd>"+ responseMessage["rating"]["average"]+"</dd>")
						}
						else
						{
							$("dl").append("<dt>Average Rating</dt><dd>N/A</dd>")
						}
						if(responseMessage["network"])
						{
							$("dl").append("<dt>Network</dt><dd>"+ responseMessage["network"]["name"]+"</dd>")

						}
						else
						{
							$("dl").append("<dt>Network</dt><dd>N/A</dd>")
						}
						if(responseMessage["summary"])
						{
							$("dl").append("<dt>Summary</dt><dd>"+ responseMessage["summary"]+"</dd>")
						}
						else
						{
							$("dl").append("<dt>Summary</dt><dd>N/A</dd>")
						}

					})

					div.show();
					aTag.show();
				}
			)
		});
		ul.show();
		
	})
	form.submit(function(event) {
		event.preventDefault();
		let searchVal = $('#search_term').val();
		div.hide()
		if(searchVal.trim().length<=0)
		{
			alert("Error: The search is empty")
		}
		ul.empty();
		requestConfig = {
			method:'POST',
			url:"/shows",
			data: {search: searchVal}
		}
		$.ajax(requestConfig).then(function(responseMessage){

			
			for(const i of responseMessage)
			{
				$("#showList").append("<li><a href ="+'/shows/'+i["show"]["id"]+">"+i["show"]["name"]+"</a></li>");
			}
			$('ul#showList li a').click(
				function(event){
					event.preventDefault();
					ul.hide();
					div.empty();
					let path = 
					console.log($(this).attr('href'))
					var requestConfig = {
						method: 'GET',
						url: $(this).attr('href')
					}
					$.ajax(requestConfig).then(function(responseMessage)
					{
						console.log(responseMessage["language"]);
						div.append("<h1>"+responseMessage["name"]+"</h1>");
						if(responseMessage["image"])
						{
							div.append("<img src="+responseMessage["image"]["medium"]+">");
						}
						else
						{
							div.append("<img src=no_image.jpeg>");
						}
						div.append("<dl></dl>");
						if(responseMessage["language"])
						{
						$("dl").append("<dt>Language</dt><dd>"+ responseMessage["language"]+"</dd>")
						}
						else{
							$("dl").append("<dt>Language</dt><dd>N/A</dd>")
						}
						if(responseMessage["genres"])
						{
							$("dl").append("<dt>Genre</dt><dd>"+ responseMessage["genres"]+"</dd>")
						}
						else
						{
							$("dl").append("<dt>Genre</dt><dd>N/A</dd>")
						}
						if(responseMessage["rating"])
						{
							$("dl").append("<dt>Average Rating</dt><dd>"+ responseMessage["rating"]["average"]+"</dd>")
						}
						else
						{
							$("dl").append("<dt>Average Rating</dt><dd>N/A</dd>")
						}
						if(responseMessage["network"])
						{
							$("dl").append("<dt>Network</dt><dd>"+ responseMessage["network"]["name"]+"</dd>")

						}
						else
						{
							$("dl").append("<dt>Network</dt><dd>N/A</dd>")
						}
						if(responseMessage["summary"])
						{
							$("dl").append("<dt>Summary</dt><dd>"+ responseMessage["summary"]+"</dd>")
						}
						else
						{
							$("dl").append("<dt>Summary</dt><dd>N/A</dd>")
						}

					})

					div.show();
					aTag.show();
				}
			)
			
		});
		ul.show();
		aTag.show();

		




	})
	$(document)