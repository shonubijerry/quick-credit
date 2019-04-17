
const showMessageBox = (title="", msg, link) => {
  document.querySelector("#mb_title").innerHTML = title;
  document.querySelector("#mb_msg").innerHTML = msg;
  document.querySelector("#mb_link").href = link;
  const messageBoxTrigger = document.querySelector(".popup1-trigger");
  messageBoxTrigger.click();
}

 
const filterLoan = (option) => {
  // When using real data, This will be handled by 
  window.location.href = option.value +'.html';
}
