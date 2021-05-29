const replaceString = "{query}";
const contextMenuData = {
  sites: [
    {
      name: "Wallmart",
      url: "http://www.walmart.com/search/?query=" + replaceString,
    },
    {
      name: "Amazon",
      url: "http://www.amazon.com/s?k=" + replaceString,
    },
    {
      name: "Amazon DE",
      url: "http://www.amazon.de/s?k=" + replaceString,
    },
    {
      name: "Amazon UK",
      url: "http://www.amazon.co.uk/s?k=" + replaceString,
    },
    {
      name: "Amazon CA",
      url: "http://www.amazon.ca/s?k=" + replaceString,
    },
    {
      name: "Amazon IT",
      url: "http://www.amazon.it/s?k=" + replaceString,
    },
    {
      name: "Aliexpress",
      url: "http://www.aliexpress.com/af/" + replaceString + ".html?&SearchText=" + replaceString,
    },
    {
      name: "Google",
      url: "http://www.google.com/search?q=" + replaceString,
    },
    {
      name: "Target",
      url: "http://www.target.com/s?searchTerm=" + replaceString,
    },
    {
      name: "Etsy",
      url: "http://www.etsy.com/search?q=" + replaceString,
    },
    {
      name: "Best Buy",
      url: "http://www.bestbuy.com/site/searchpage.jsp?st=" + replaceString,
    },
    {
      name: "eBay",
      url: "http://www.ebay.com/sch/i.html?_nkw=" + replaceString,
    },
    {
      name: "YouTube",
      url: "http://www.youtube.com/results?search_query=" + replaceString,
    },
    {
      name: "Tmall",
      url: "http://list.tmall.com/search_product.htm?q=" + replaceString,
    },
    {
      name: "Reddit",
      url: "https://www.reddit.com/search/?q=" + replaceString,
    }
  ],
};

contextMenuData.sites.sort((current, next) =>
  current.name.localeCompare(next.name)
);

chrome.runtime.onInstalled.addListener(() => {
  for (let i = 0; i < contextMenuData.sites.length; i++) {
    chrome.contextMenus.create({
      id: contextMenuData.sites[i].name,
      title: contextMenuData.sites[i].name,
      contexts: ["selection"],
    });
  }
});

chrome.contextMenus.onClicked.addListener((info) => {
  var query = info.selectionText;
  let url = contextMenuData.sites.find((i) => i.name === info.menuItemId).url;
  url = replaceAll(url, replaceString, query);
  chrome.tabs.create({ url });
});

function replaceAll(string, replaceWhat, replaceTo) {
  replaceWhat = replaceWhat.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  var regex = new RegExp(replaceWhat, "g");
  return string.replace(regex, replaceTo);
}
