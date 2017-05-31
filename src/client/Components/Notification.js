export default function Notification (obj) {

  let titulo = `Tienes un nuevo mensaje de ${obj.username}`;
  let options = {
    icon: `${obj.avatar}`,
    body: obj.message
  }

  if(Notification) {
    console.log('excelente');
    if (Notification.permission === "granted"){
       var newNoti = new Notification(titulo, options);
       setTimeout(newNoti.close.bind(newNoti), 6000);
    }

  }
}
