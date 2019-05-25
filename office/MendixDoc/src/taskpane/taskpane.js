let documentation = {};

Office.onReady(info => {
    if (info.host === Office.HostType.Word) {
        document.getElementById("sideload-msg").style.display = "none";
        document.getElementById("app-body").style.display = "flex";
        document.getElementById("run").onclick = run;
    }

    $(document).ready(function () {
        $("#projects").html("ok...");
        $.ajax("https://localhost:3000/api/v1/mendix/projects?rnd=" + +new Date(), {
            success: function (data) {
                $("#projects").html(data);
                $(".file-tree").filetree({
                    collapsed: true,
                });
                $(".btn-project").on("click", function() {
                    $.ajax("https://localhost:3000/api/v1/documentation/" + $(this).data("project") + "?rnd=" + +new Date(), {
                        success: function (data) {
                            documentation = data;
                        }
                    });
                });
            }, 
            error: function (err) {
                $("#projects").html("An error occurred" + JSON.stringify(err, null, 4));
            }
        });
    }); 
});

export async function run() {
    return Word.run(async context => {
        /**
         * Insert your Word code here
         */
        documentation.paragraphs.map((p, index) => {

                if (p.style === "PAGEBREAK") {
                    context.document.body.insertBreak("Page", Word.InsertLocation.end);
                } else {
                    // insert a paragraph at the end of the document.
                    const paragraph = context.document.body.insertParagraph(p.value, Word.InsertLocation.end);

                    // change the paragraph color to blue.
                    paragraph.style = p.style
                }

        });
        await context.sync();
    });
}