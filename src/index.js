const fs = require('fs');
const robot = require("robotjs");

const message_bar = { hex: 'ffffff', mouse: { x: 262, y: 875 } };
const without_link = { hex: '999999', mouse: { x: 390, y: 818 } };
const send = { hex: '4cace4', mouse: { x: 390, y: 875 } };
const chanel3 = { hex: 'effdde', mouse: { x: 303, y: 822 } };

const checkIfBanned = { hex: 'ffffff', mouse: { x: 363, y: 429 } };
const okBanned = { hex: '168acd', mouse: { x: 346, y: 487 } };

const threedots = { hex: 'ffffff', mouse: { x: 389, y: 29 } };
const other = { hex: 'f1f1f2', mouse: { x: 181, y: 552 } };
const details = { hex: 'ffffff', mouse: { x: 172, y: 481 } }
const report_submit = { hex: '97cbea', mouse: { x: 336, y: 528 } };
const back = { hex: 'ffffff', mouse: { x: 23, y: 34 } };
const to_delete = { hex: 'effddf', mouse: { x: 354, y: 819 } };
const delete_ = { hex: 'f1f1f2', mouse: { x: 400, y: 762 } };
const agree = { hex: 'e3f1fb', mouse: { x: 345, y: 492 } };

const click = async (point, button = "left") => {
    console.log(point);
    robot.moveMouse(point.mouse.x, point.mouse.y);
    await sleep(1000);
    robot.mouseClick(button);
}

const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

(async () => {
    const array = fs.readFileSync('chats.txt').toString().split("\n");
    for (i of array) {
        const tg = i;
        await sleep(3000);

        await click(message_bar);
        await sleep(1000);
        robot.typeString(tg);

        await sleep(1000);
        await click(without_link);

        await sleep(1000);
        await click(send);

        await click(chanel3);
        await sleep(1000);

        if(checkIfBanned.hex != robot.getPixelColor(checkIfBanned.x, checkIfBanned.y)) {
            await click(okBanned);

            await sleep(1000);
            await click(to_delete, "right");
    
            await sleep(1000);
            await click(delete_);
    
            await sleep(1000);
            await click(agree);
            continue;
        }

        await click(threedots);
        await sleep(1000);

        const report_dynamic = await smartSearch();

        await sleep(1000);
        await click(report_dynamic);

        await sleep(1000);
        await click(other);

        await sleep(1000);
        await click(details);

        robot.typeString("Disinformation and violence about disinformation in Ukraine");

        await sleep(1000);
        await click(report_submit);

        await sleep(1000);
        await click(back);

        await sleep(1000);
        await click(to_delete, "right");

        await sleep(1000);
        await click(delete_);

        await sleep(1000);
        await click(agree);
    }

})();


const smartSearch = async () => {
    var from = { hex: 'ffffff', mouse: { x: 401, y: 53 } };
    var to = { hex: 'c8d3af', mouse: { x: 401, y: 300 } }

    const arr = [];

    let prev = "";
    for (let y = from.mouse.y; y < to.mouse.y; y += 2) {
        let x = from.mouse.x;
        // robot.moveMouse(x, y);
        let hex = robot.getPixelColor(x, y);
        console.log(hex);
        arr.push({ mouse: { x, y }, hex });


        if (prev == "ffffff" && hex != "ffffff") {
            return arr[arr.length - 6];
        }
        prev = hex;
    }
}