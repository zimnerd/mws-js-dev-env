import './index.css'
import './assets/css/bootstrap.min.css'
import './assets/css/bootstrap-grid.min.css'
import './assets/css/bootstrap-reboot.min.css'
import {deleteUser,getUsers} from "./api/apiUsers";
getUsers().then(result => {
  console.log(result);//eslint-disable-line no-console
  let userBody = "";
  result.forEach(user => {
    userBody += `<tr>
<td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a> </td>
<td>${user.id}</td><td>${user.firstName}</td><td>${user.lastName}</td><td>${user.email}</td>
</tr>`;
  });

  global.document.getElementById("users").innerHTML = userBody;

  const deleteLinks = global.document.getElementsByClassName("deleteUser");

  // Must use array.from to create a real array from a DOM collection
  // getElementsByClassname only returns an "array like" object
  Array.from(deleteLinks, link => {
    link.onclick = function (event) {
      const element = event.target;
      event.preventDefault();
      deleteUser(element.attributes["data-id"].value);
      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);
    };
  });
});