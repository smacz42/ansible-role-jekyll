wddAppsList = [
          {did: 2 , title : 'Articles', ref : 'home', id: 'article', 'desc' : 'Insightful views, engaging editorials, and expansive tutorials on all things web design',  'short_desc' : 'Articles short description' },
          {did: 4 , title : 'Behance', ref : 'behance', id: 'behance', 'desc' : 'Browse the best design work online via the top rated projects on Behance',  'short_desc' : 'Behance short description' },
          {did: 5 , title : 'Books', ref : 'books', id: 'books', 'desc' : 'Discover your next favorite book, from CSS guides to Graphic Design classics, all available through Amazon',  'short_desc' : 'Books short description' },
          {did: 6 , title : 'Codepen', ref : 'codepen', id: 'codepen', 'desc' : 'Browse the latest code experiments direct from Codepen’s expert community',  'short_desc' : 'Codepen short description' },
          {did: 9 , title : 'Comics', ref : 'comics', id: 'comics', 'desc' : 'Work on the Web? Then you’ll laugh out loud at Jerry King’s hilarious comic take on web design',  'short_desc' : 'Comics short description' },
          {did: 13 , title : 'Deals', ref : 'mightydeals', id: 'mightydeals', 'desc' : 'The best deals on the Web for designers and developers, direct from MightyDeals.com',  'short_desc' : 'Deals short description' },
          {did: 3 , title : 'Dribbble', ref : 'dribbles', id: 'drible', 'desc' : 'Get inspired by the very latest shots on Dribbble, and maybe try a rebound',  'short_desc' : 'Dribbble short description' },
          {did: 10 , title : 'Events', ref : 'conferences', id: 'conferences', 'desc' : 'Keep your finger on the pulse of the community with all the upcoming design events in your area',  'short_desc' : 'Events short description' },
          {did: 16 , title : 'Github', ref : 'github', id: 'github', 'desc' : 'Power through your next development project with the top resources hosted on Github',  'short_desc' : 'Github short description' },
          {did: 7 , title : 'Interviews', ref : 'interviews', id: 'interviews', 'desc' : 'Browse through hundreds of design videos, and get inspired by expert views on the design industry',  'short_desc' : 'Interviews short description' },
          {did: 21 , title : 'Photos', ref : 'photos', id: 'photos', 'desc' : 'Thousands of free images to use in your next project. Free for personal and commercial use.',  'short_desc' : 'Photos short description' },
          {did: 12 , title : 'Play', ref : 'play', id: 'play', 'desc' : 'Grab some r‘n’r with some of the coolest eye candy, demos and games on the Web. Press SHUFFLE for more!',  'short_desc' : 'Play short description' },
          {did: 17 , title : 'Podcasts', ref : 'podcasts', id: 'podcasts', 'desc' : 'Keep up to date with the latest trends in the industry with the most engaging podcasts',  'short_desc' : 'Podcasts short description' },
          {did: 15 , title : 'Quotes', ref : 'quotes', id: 'quotes', 'desc' : 'Get inspired by the wise words of designers, developers, entrepreneurs, and technologists',  'short_desc' : 'Quotes short description' },
          {did: 11 , title : 'Scripts', ref : 'code', id: 'code', 'desc' : 'Find answers to your coding problems in our huge archive of tried and tested resources and solutions',  'short_desc' : 'Code short description' },
          {did: 20 , title : 'Vectors', ref : 'vectors', id: 'vectors', 'desc' : 'Browse through our extensive catalog of free vectors, free for personal and commercial use',  'short_desc' : 'Vectors short description' },
          {did: 14 , title : 'Videos', ref : 'videos', id: 'videos', 'desc' : 'Sit back, relax, and enjoy videos of designers being interviewed, conference talks  and more',  'short_desc' : 'Videos short description' }          
];

var anJs = {
      templates: {
        articles_template: "/app/articles-template-clean",
        article_template: "/app/article-template",
        icons_template: "/app/icons-template",
        apps_template: "/app/apps-template",
        dribbles_template: "/app/dribbles-template",
        dribble_shot_template: "/app/dribble-shot-template",
        behance_template: "/app/behance-template",
        behance_project_template: "/app/behance-project-template",
        comics_template : "/app/comics-template",
        comics_image_template : "/app/comics-image-template",
        
        videos_template : "/app/videos-template",
        video_template : "/app/video-template",
        interviews_template : "/app/interviews-template",
        
        resources_template : "/app/resources-template",
        resource_template : "/app/resource-template",
        
        
        vectors_template : "/app/vectors-template",
        vector_template : "/app/vector-template",
        
        photos_template : "/app/photos-template",
        photo_template : "/app/photo-template",

        fonts_template : "/app/fonts-template",
        font_template : "/app/font-template",
        home_template : "/app/home-next-template",
        

        jobs_template : "/app/jobs-template",
        job_template : "/app/job-template",

        podcasts_template : "/app/podcasts-template",
        podcast_template : "/app/podcast-template",

        wdn_template: "/app/wdn-template",
        mightydeals_template: "/app/mightydeals-template",
        
        play_template: "/app/play-template",
        conferences_template: "/app/conferences-template",
        
        github_template: "/app/github-template",
        quote_template: "/app/quote-template",
        quotes_template: "/app/quotes-template",
        kickstarter_template: "/app/kickstarter-template",
        books_template: "/app/books-template",
        book_template: "/app/book-template",

        codepen_template: "/app/codepen-template",
        pen_template: "/app/pen-template",
        codevisually_template: "/app/codevisually-template",
        
        code_item_template: "/app/code-item-template"
        

      },
      routes : {
        
        "api_codepen" : "/app/api/codepen",
        "api_interview_domains" : "/app/api/interview-domains",
        "api_funded_categories" : "/app/api/funded/categories",
        "api_videos_categories" : "/app/api/videos/categories",
        "api_play_url" : "/app/api/play-url",
        "api_git_hub_trending" : "/app/api/git-hub-trending",
        "api_event_locations" : "/app/api/event-locations",
        "api_resource_categories" : "/app/api/resource/categories",
        "api_podcast_sources" : "/app/api/podcst-sources",
        "api_stat_save" : "/app/api/stat-save",
        
        "api_event_dates" : "/app/api/event-dates",
        "api_random_quote" : "/app/api/random-quote",
        "videos" : "/app/videos",
        
        "video" : "/app/video",
        
        "vector" : "/app/vector",
        "photo" : "/app/photo",
        "script" : "/app/script",
        
        "comics" : "/app/comics",
        "comics_entry" : "/app/comics-entry",
        
        "interviews" : "/app/interviews",
        "resources" : "/app/resources",
        
        "conferences" : "/app/conferences",
        
        
        "fonts" : "/app/fonts",
        "font" : "/app/font",
        "quotes" : "/app/quotes",
        "books" : "/app/books",
        "book" : "/app/book",

        "jobs" : "/app/jobs",
        "job" : "/app/job",
        "play" : "/app/play",
        

        "podcasts" : "/app/podcasts",
        "podcast" : "/app/podcast",
        "kickstarter" : "/app/kickstarter",
        "api_vectors" : "http://www.1001freedownloads.com/api/wdd-vectors",
        "api_code" : "http://www.codevisually.com/api/wddapi.php",
        "api_code_categories" : "http://www.codevisually.com/api/wddapi.php?categories=1"

      },
      api_keys :{
        'behance' : 'ggEgdpS6FWFi9nYQ97MD6LwXfhoAEbIY',
        'dribbble_token' : 'e119c18b1759fed1e61442fe049fb32bd4a2e6eca2e8e641226f1148805649b9',
        'iconfinder' : '2827ca25211e45cf9c95d63dd75654e0'
      },
      config : {
        domain : "http://www.webdesignerdepot.com",
                is_wdd_mobile : true
              },
      
      settings : {
       'no_disqus' : true
      }
      
    };
    


    
