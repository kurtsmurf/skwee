export default () => 
    document.body.style
        .setProperty("--base-hue", `${Math.random() * 360}`);
