function solve() {
   let creator = document.getElementById('creator'); // Author
   let title = document.getElementById('title'); // Title
   let category = document.getElementById('category'); // Category
   let content = document.getElementById('content'); // Content

   let btnCreate = document.getElementsByClassName('btn create')[0];

   let section = document.querySelector('main section');

   btnCreate.addEventListener('click', createArticle);

   function createArticle(ev) {
      ev.preventDefault();

      // if (creator.value == '' || title.value == '' || category.value == '' || content.value == '') {
      //    return;
      // }

      let article = document.createElement('article');

      let h1_Title = document.createElement('h1');
      let p_Category = document.createElement('p');
      let p_Creator = document.createElement('p');
      let p_Content = document.createElement('p');
      let div_Buttons = document.createElement('div');

      let strong_Category = document.createElement('strong');
      let strong_Creator = document.createElement('strong');
      let button_Delete = document.createElement('button');
      let button_Archive = document.createElement('button');

      section.appendChild(article);
      article.appendChild(h1_Title);
      h1_Title.textContent = title.value;

      article.appendChild(p_Category);
      p_Category.textContent = 'Category: ';
      p_Category.appendChild(strong_Category);
      strong_Category.textContent = category.value;

      article.appendChild(p_Creator);
      p_Creator.textContent = 'Creator: ';
      p_Creator.appendChild(strong_Creator);
      strong_Creator.textContent = creator.value;

      article.appendChild(p_Content);
      p_Content.textContent = content.value;

      article.appendChild(div_Buttons);
      div_Buttons.appendChild(button_Delete);
      button_Delete.textContent = 'Delete';
      div_Buttons.appendChild(button_Archive);
      button_Archive.textContent = 'Archive';

      // Attributes
      div_Buttons.setAttribute('class', 'buttons');
      button_Delete.setAttribute('class', 'btn delete');
      button_Archive.setAttribute('class', 'btn archive');

      creator.value = '';
      title.value = '';
      category.value = '';
      content.value = '';


      button_Archive.addEventListener('click', archive);
      button_Delete.addEventListener('click', deleteArticle);


      function deleteArticle(ev) {
         ev.preventDefault();

         let article = document.querySelector('main section article');
         article.remove();
      }

      function archive(e) {
         e.preventDefault();

         let ol = document.getElementsByClassName('archive-section')[0].children[1];
         let li = document.createElement('li');
         li.textContent = h1_Title.textContent;
         ol.appendChild(li);

         let items = ol.childNodes;
         let itemsArr = [];
         for (var i in items) {
            if (items[i].nodeType == 1) {
               itemsArr.push(items[i]);
            }
         }

         // itemsArr.sort((a, b) => a.localCompare(b));
         itemsArr.sort(function (a, b) {
            return a.innerHTML == b.innerHTML
               ? 0
               : (a.innerHTML > b.innerHTML ? 1 : -1);
         });

         for (i = 0; i < itemsArr.length; ++i) {
            ol.appendChild(itemsArr[i]);
         }

         deleteArticle(e);
      }
   }
}
