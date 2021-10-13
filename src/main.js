import imageURL from './lamb-close.png';

let localStorageSites = localStorage.getItem('sites');

const defaultSites = [{
    'letter': 'a',
    'name': 'acfun.cn',
    'url': 'https://www.acfun.cn/'
}, {
    'letter': 'b',
    'name': 'bilibili.com',
    'url': 'https://www.bilibili.com/'
}, {
    'letter': 'g',
    'name': 'github.com',
    'url': 'https://github.com/'
}];

let sites = JSON.parse(localStorageSites) || defaultSites;


const formatSiteName = (url) => {
    return url.replace('http://', '').replace('https://', '').replace('//', '').replace('www.', '').replace(/\/.*/, '');
}

const formatUrl = (siteName) => {
    return '//' + siteName;
}

window.onbeforeunload = function() {
    var string = JSON.stringify(sites);
    localStorage.setItem('sites', string);
};

$(function() {
    $(".searchForm>input").focus();

    $(".addSite").click(function() {
        const url = window.prompt('请输入要添加的网址');
        let site = { 'name': formatSiteName(url) };
        site.letter = site.name[0];
        site.url = formatUrl(site.name);
        sites.push(site);
        showSites();
    });


    $(document).on('keypress', function(e) {
        var key = e.key;

        for (var i = 0; i < sites.length; i++) {
            if (sites[i].letter.toLowerCase() === key) {
                window.open(sites[i].url);
            }
        }
    });

    showSites();

    function showSites() {
        $(".nav-main>ul>li:not(.addSite)").remove();

        sites.forEach((item, index) => {
            let $li = $(`<li>
                    <div class="logo">${item.letter}</div>
                    <div class="link">${item.name}</div>
                    <input type="hidden" value="${item.url}">
                    <img src="${imageURL}">
                </li>`).insertBefore($(".addSite"));
            $li.click(function() {
                window.open($(this).find(":hidden").val());
            });

            $li.find('img').click(function(e) {
                sites.splice(index, 1);
                e.stopPropagation();
                showSites();
            });
        })

    }
})