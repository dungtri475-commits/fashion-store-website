export function icon(name, className = ""){
    const iconMap = {
        menu: "./assets/icons/Menu.svg",
        search: "./assets/icons/Search.svg",
        "shopping-bag": "./assets/icons/shopping-bag.svg",
        twitter: "./assets/icons/Twitter.svg",
        instagram: "./assets/icons/Instagram.svg",
        youtube: "./assets/icons/youtube.svg",
    };

    const src = iconMap[name];

    if (!src) {
        console.warn(`Icon "${name}" does not exit in iconMap`);
        return "";
    }
    return `
       <img 
            src="${src}" 
            alt="${name}"
            class="icon ${className}"
            />
    `;
}

// render Button
export function button(content, className = "", type = "button") {
    return `
   <button type="${type}" class="btn ${className}">
      ${content}
   </button>
    `;
}

// render Divider
export function divider(className = ""){
    return `
       <div class = "divider ${className}"> </div>
    `;
}

// render link
export function link(text, href = "#", className = ""){
    return `
       <a href="${href}" class="link ${className}">
            ${text}
       </a>
    `;
}