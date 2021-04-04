import { html, render } from 'https://unpkg.com/lit-html?module';
import {getWikiByid} from "./data.js";

function detailsTemplate(wiki, userIsOwner){
return html`
 <section id="details-page" class="content details">
            <h1>${wiki.title}</h1>

            <div class="details-content">
                <strong>${wiki.category}</strong>
                <p>${wiki.content}</p>

                <div class="buttons">
                    ${userIsOwner?html`   <a href="#" class="btn delete">Delete</a>
                    <a href="/edit/${wiki._id}" class="btn edit">Edit</a>`:""}
                 
                    <a href="/" class="btn edit">Back</a>
                </div>
            </div>
        </section>
`
}

export async function details(ctx){
    let wikiId=ctx.params.id;
    let wiki= await getWikiByid(wikiId);
    let userIsOwner=wiki._ownerId==sessionStorage.getItem("userId");

    ctx.render(detailsTemplate(wiki,userIsOwner))
}