# Veltrix Motors website

A small static website for the fictional car brand **Veltrix Motors**, in English and French.

Live site: [yongsheng-commint.github.io/Html_website](https://yongsheng-commint.github.io/Html_website/)

## Pages

| Page | English | French |
| --- | --- | --- |
| Home | `index.html` | `FR/FRhome.html` |
| About | `English/About.html` | `FR/FRabout.html` |
| FAQ | `English/FAQ.html` | `FR/FRFQA.html` |
| Contact | `English/Context.html` | `FR/FRcontact.html` |
| All vehicles | `English/explore-all-vehicles.html` | `FR/ExploreAllVehicleFR.html` |

`English/Htmlproject.html` only redirects to `index.html`, so old links keep working.

## Shared files

- `css/style.css` holds the styles used by every page. Change the look of the site here.
- `js/main.js` holds the scripts: language menu, rotating hero image, vehicle tabs, price/type filter and contact form.

## Run it locally

Open `index.html` in a browser, or start a local server from this folder:

```sh
python3 -m http.server
```

Then visit <http://localhost:8000>.

## Notes

- The contact form only shows a thank-you message. To actually receive messages, connect it to a form service such as [Formspree](https://formspree.io/).
- Car photos and the hero GIFs are loaded from other websites. If one of them disappears, download a replacement you are allowed to use into an `images/` folder and update the link.
