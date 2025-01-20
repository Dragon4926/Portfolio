const banner = [
  '<span class="index">All rights reserved @Dragon4926 | 2024.</span>',
  "                                                                     ",
  "  _ .-') _  _  .-')   ('-.                                  .-') _  ",                                   
  "( (  OO) )( \\( -O )   ( OO ).-.                             ( OO ) )  ",                                  
  " \\     .'_ ,------.   / . --. /  ,----.      .-'),-----. ,--./ ,--,'   .---.  .----.   .-----.   ,--.   ", 
  " ,`'--..._)|   /`. '  |  \\-. \\  '   .-./-') ( OO'  .-.  '|   \\ |  |\\  / .  | /  ,.  \\ / ,-.   \\ /  .'    ",
  " |  |  \\  '|  /  | |.-'-'  |  | |  |_( O- )/    |  | |  ||    \\|  | )/ /|  ||  |  \\  |'-'  |  |.  / -.     ",
  " |  |   ' ||  |_.' | \\| |_.'  | |  | .--, \\_)   |  |\\|  ||  .     |// / |  |_'  `-'  '   .'  / | .-.  '     ",
  " |  |   / :|  .  '.'  |  .-.  |(|  | '. (_/  \\  |  | |  ||  |\\    |/  '-'    |`- /  '  .'  /__ ' \\  |  |   ",
  " |  '--'  /|  |\\  \\   |  | |  | |  '--'  |     `'  '-'  '|  | \\   |`----|  |-' ,'  /  |       |\\  `'  /   ",
  " `-------' `--' '--'  `--' `--'  `------'        `-----' `--'  `--'     `--'  `---'   `-------' `----'  ",
  "                                                                     ",
  '<span class="color2">Welcome to my interactive hecking terminal.</span>',
  "<span class=\"color2\">For a list of available commands, type</span> <span class=\"command\">'help'</span><span class=\"color2\">.</span>",
];

var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer");
var textarea = document.getElementById("texter");
var terminal = document.getElementById("terminal");
var password = "1234";
var git = 0;
var pw = false;
let pwd = false;
var commands = [];

const terminalContainer = document.getElementById("terminal");

setTimeout(function () {
  loopLines(banner, "", 80);
  textarea.focus();
}, 100);

window.addEventListener("keyup", enterKey);

console.log(
  "%cStop stealing my password ☠️",
  `color: var(--text-color); font-weight: bold; font-size: 24px;`
);
console.log(
  "%cPassword: '" + password + "' - Allright just take it...",
  "color: grey"
);

//init
textarea.value = "";
command.innerHTML = textarea.value;

document.addEventListener('click', function(e) {
  // Only focus if clicking inside terminal area or command area
  if (e.target.closest('#terminal') || e.target.closest('#command')) {
    textarea.focus();
  }
});

function enterKey(e) {
  if (e.keyCode == 181) {
    document.location.reload(true);
  }
  if (pw) {
    let et = "*";
    let w = textarea.value.length;
    command.innerHTML = et.repeat(w);
    if (textarea.value === password) {
      pwd = true;
    }
    if (pwd && e.keyCode == 13) {
      loopLines(secret, "color2 margin", 120);
      command.innerHTML = "";
      textarea.value = "";
      pwd = false;
      pw = false;
      liner.classList.remove("password");
    } else if (e.keyCode == 13) {
      addLine("Wrong password", "error", 0);
      command.innerHTML = "";
      textarea.value = "";
      pw = false;
      liner.classList.remove("password");
    }
  } else {
    if (e.keyCode == 13) {
      commands.push(command.innerHTML);
      git = commands.length;
      addLine("@drago ➜ ~ " + command.innerHTML, "no-animation", 0);
      commander(command.innerHTML.toLowerCase());
      command.innerHTML = "";
      textarea.value = "";
    }
    if (e.keyCode == 38 && git != 0) {
      git -= 1;
      textarea.value = commands[git];
      command.innerHTML = textarea.value;
    }
    if (e.keyCode == 40 && git != commands.length) {
      git += 1;
      if (commands[git] === undefined) {
        textarea.value = "";
      } else {
        textarea.value = commands[git];
      }
      command.innerHTML = textarea.value;
    }
  }
}

function commander(cmd) {
  try {
    switch (cmd.toLowerCase()) {
      case "help":
        loopLines(help, "color2 margin", 80);
        break;
      case "whoami":
        loopLines(whoami, "color2 margin", 80);
        break;
      case "sudo":
        addLine("Oh no, you're not me...", "color2", 80);
        setTimeout(function () {
          window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        }, 1000);
        break;
      case "social":
        loopLines(social, "color2 margin", 80);
        break;
      case "secret":
        liner.classList.add("password");
        pw = true;
        break;
      case "projects":
        addLine("Loading projects...", "color2", 0);
        fetchGitHubPinnedRepos().then(projectsOutput => {
          loopLines(projectsOutput, "color2 margin", 80);
        });
        break;
      case "password":
        addLine(
          '<span class="inherit"> Lol! You\'re joking, right? As if it would be that easy 🤣</span>',
          "error",
          100
        );
        break;
      case "history":
        addLine("<br>", "", 0);
        loopLines(commands, "color2", 80);
        addLine("<br>", "command", 80 * commands.length + 50);
        break;
      case "email":
        const recipient = email;
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}`;
        addLine(`Opening Gmail compose... 📧`, "color2", 80);
        window.open(gmailUrl, '_blank');
        break;
      case "clear":
        setTimeout(function () {
          terminal.innerHTML = '<a id="before"></a>';
          before = document.getElementById("before");
        }, 1);
        break;
      case "banner":
        loopLines(banner, "", 80);
        break;
      // socials
      case "twitter":
        addLine("Opening Twitter...", "color2", 0);
        newTab(twitter);
        break;
      case "linkedin":
        addLine("Opening LinkedIn...", "color2", 0);
        newTab(linkedin);
        break;
      case "github":
        addLine("Opening GitHub...", "color2", 0);
        newTab(github);
        break;
      default:
        addLine(
          '<span class="inherit">Command not found. For a list of commands, type <span class="command">\'help\'</span>.</span>',
          "error",
          100
        );
        break;
    }
  } catch (error) {
    addLine('An error occurred while processing your command', 'error', 0);
    console.error(error);
  }
}

function newTab(link) {
  setTimeout(function () {
    window.open(link, "_blank");
  }, 500);
}

function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function () {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function (item, index) {
    addLine(item, style, index * time);
  });
}

document.getElementById("command").onclick = null;
