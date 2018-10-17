/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         it('should have a non-empty URL defined for each feed', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
         });

        it('should have a non-empty name defined for each feed', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
         });
    });

    describe('The menu', function() {
        let divTags;
        let menuElement;
        let style;
        let menuWidth;

        beforeEach(function() {
            divTags = $("div");
            for(let i = 0; i < $(divTags).length; i++){
               if($(divTags[i]).hasClass('slide-menu')){
                   menuElement = $(divTags[i]);
                   break;
               }
            };
            menuWidth = parseInt($(menuElement).css('width')) + parseInt($(menuElement).css('padding')) * 2;
        });

        it('should be hidden by default', function() {
            let transform = $(menuElement).css('transform').split(',')[4];
            //Menu should be moved farther left than the menu's width, then we know it's hidden. (Since it's shift is negative, I'm comparing it to negative width)
            expect(transform).not.toBeGreaterThan(-menuWidth); 
        });

        it('should be visible on click', function(done) {
            let menuIcon = $('.menu-icon-link');
            let transitionDurationMilliseconds = parseFloat($(menuElement).css('transitionDuration'), 10) * 1000;
            menuIcon.trigger('click');

            setTimeout(function() {
                let transform = $(menuElement).css('transform').split(',')[4];
                expect(parseInt(transform, 10)).toEqual(0);
                done();
            }, transitionDurationMilliseconds + 100);
        });

        it('should be hidden when clicked again', function(done) {
            let menuIcon = $('.menu-icon-link');
            let transitionDurationMilliseconds = parseFloat($(menuElement).css('transitionDuration'), 10) * 1000;
            menuIcon.trigger('click');

            setTimeout(function() {
                let transform = $(menuElement).css('transform').split(',')[4];
                expect(transform).not.toBeGreaterThan(-menuWidth); 
                done();
            }, transitionDurationMilliseconds + 100);
        });
    });

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('should have at least one feed entry after loadFeed is called', function(done) {
            let entries = $("div.feed .entry");
            expect(entries.length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        let initialEntry;

        beforeEach(function(done) {
            initialEntry = $("div.feed .entry")[0].innerText;

            loadFeed(1, function() {
                done();
            });
        });

        it('should change content when new feed is loaded', function(done) {
            let newEntry = $("div.feed .entry")[0].innerText;
            expect(newEntry).not.toBe(initialEntry);
            done();
        });
    });

}());
