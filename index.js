//Side bar
const menuItems = document.querySelectorAll('.menu-item');

//messages
const messagesNotification = document.querySelector('#messages-notification');
const messages = document.querySelector('.messages');
const message = messages.querySelectorAll('.message');
const messageSearch = document.querySelector('#message-search');

//removing active class from all menu items
const changeActiveitem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    })
}


menuItems.forEach(item => {
    item.addEventListener('click' , () => {
        changeActiveitem();
        item.classList.add('active');
        if(item.id != 'notifications'){
            document.querySelector('.notifications-popup').
            style.display = 'none';
        } else{
            document.querySelector('.notifications-popup').
            style.display = 'block';
            document.querySelector('#notifications .notification-count').style.display= 'none';
        }
    })
})


//messages
//searcheschat
const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();

    message.forEach(user => {
        let name = user.querySelectorAll('h5').textContent.toLowerCase();
        if(name.indexOf(val) != -1){
            user.style.display = 'flex';
        }else{
            user.style.display = 'none';
        }
    })
}


/*********************************
 * LIKE & COMMENT STATE MANAGEMENT
 *********************************/
const feeds = document.querySelectorAll('.feed');

const state = [...feeds].map(() => ({
  liked: false,
  likes: 0,
  comments: []
}));

feeds.forEach((feed, index) => {
  const heartIcon = feed.querySelector('.uil-heart');
  const commentIcon = feed.querySelector('.uil-comment');
  const likeText = feed.querySelector('p');

  /* -------- LIKE INIT -------- */
  const match = likeText.textContent.match(/(\d+)/);
  state[index].likes = match ? parseInt(match[0]) : 0;

  /* -------- LIKE CLICK -------- */
  heartIcon.addEventListener('click', () => {
    state[index].liked = !state[index].liked;
    state[index].likes += state[index].liked ? 1 : -1;

    heartIcon.classList.toggle('liked', state[index].liked);

    likeText.innerHTML = state[index].liked
      ? `Liked by <b>You</b> and <b>${state[index].likes - 1} others</b>`
      : `Liked by <b>User</b> and <b>${state[index].likes} others</b>`;
  });

  /* -------- COMMENT SYSTEM -------- */
  let commentBox = document.createElement('div');
  commentBox.className = 'dynamic-comments';

  let input = document.createElement('input');
  input.className = 'comment-input';
  input.placeholder = 'Add a comment...';

  feed.appendChild(commentBox);
  feed.appendChild(input);

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && input.value.trim() !== '') {
      state[index].comments.push(input.value.trim());

      const p = document.createElement('p');
      p.innerHTML = `<b>You</b> ${input.value}`;
      commentBox.appendChild(p);

      input.value = '';
    }
  });
});


   





//search chat
messageSearch.addEventListener('keyup', searchMessage);

//highlight messages card when messages menu item is clicked
messagesNotification.addEventListener('click', () => {
    messages.style.boxShadow = '0 0 1rem var(--color-primary)';
    messagesNotification.querySelector('.notification-count').style.display = 'none';
    setTimeout(() => {
        messages.style.boxShadow = 'none';
    }, 3000);
})


