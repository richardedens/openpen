/* global jsPlumb */
jsPlumb.bind("ready", function () {

    String.prototype.contains = function (word, start) {
        if (start == undefined) {
            start = 0;
        }
        return this.includes(word, start);
    }

    var Core = {
        createWorkflow: function (val, role, action, result) {

            var common = {
                cssClass: "workflow-design"
            };
            var workflowEngine = jsPlumb.getInstance();
            workflowEngine.importDefaults({
                Endpoint: ["Dot", { radius: 3, hoverClass: "workflow-dot-hover" }, common],
                Connector: ["Straight", { curviness: 0.01 }, common],
                Anchors: ["Right", "Left"]
            });

            var oldElementIndex = 0, newElementIndex = 1, workflowScope = "workflowScope";

            var elements = {
                startElement: `<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 50 100\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xml:space=\"preserve\" xmlns:serif=\"http://www.serif.com/\" style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;\">
                                <g transform=\"matrix(0.581621,0,0,0.581621,3.15704,-112.661)\">
                                    <circle cx=\"51.31\" cy=\"279.668\" r=\"20.632\" style=\"fill:rgb(126,201,109);stroke:rgb(0,144,0);stroke-width:1px;\"/>
                                </g>
                            </svg>`,
                createPage: `<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 200 100\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xml:space=\"preserve\" xmlns:serif=\"http://www.serif.com/\" style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;\">
                                <g transform=\"matrix(1,0,0,1,-6.0646,-5.60316)\">
                                    <path d=\"M194.463,35.3C194.463,24.094 185.365,14.997 174.16,14.997L37.97,14.997C26.764,14.997 17.666,24.094 17.666,35.3L17.666,75.906C17.666,87.112 26.764,96.21 37.97,96.21L174.16,96.21C185.365,96.21 194.463,87.112 194.463,75.906L194.463,35.3Z\" style=\"fill:rgb(218,241,253);stroke:rgb(113,147,173);stroke-width:1px;\"/>
                                </g>
                                <g transform=\"matrix(1,0,0,1,-17.7983,20.4127)\">
                                    <text x=\"44.957px\" y=\"43.078px\" style=\"font-family:'Calibri', sans-serif;font-size:15px;\">create a page</text>
                                </g>
                                <g transform=\"matrix(1,0,0,1,-36.1506,34.4522)\">
                                    <text x=\"62.863px\" y=\"43.078px\" style=\"font-family:'Calibri', sans-serif;font-size:15px;\">{{page}}</text>
                                </g>
                                <g transform=\"matrix(1.76471,0,0,1.76471,85,15.3593)\">
                                    <path d=\"M0,0L0,17L17,17L17,0L0,0ZM1,6L10,6L10,16L1,16L1,6ZM16,16L11,16L11,6L16,6L16,16ZM1,5L1,1L16,1L16,5L1,5Z\" style=\"fill:rgb(113,147,172);fill-rule:nonzero;\"/>
                                </g>
                            </svg>`,
                createUser: `<svg width=\"200\" height=\"100\" viewBox=\"0 0 200 100\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xml:space=\"preserve\" xmlns:serif=\"http://www.serif.com/\" style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;\">
                                <g transform=\"matrix(1,0,0,1,-6.0646,-5.60316)\">
                                    <path d=\"M194.463,35.3C194.463,24.094 185.365,14.997 174.16,14.997L37.97,14.997C26.764,14.997 17.666,24.094 17.666,35.3L17.666,75.906C17.666,87.112 26.764,96.21 37.97,96.21L174.16,96.21C185.365,96.21 194.463,87.112 194.463,75.906L194.463,35.3Z\" style=\"fill:rgb(218,241,253);stroke:rgb(113,147,173);stroke-width:1px;\"/>
                                </g>
                                <g transform=\"matrix(1,0,0,1,-17.7983,20.4127)\">
                                    <text x=\"44.957px\" y=\"43.078px\" style=\"font-family:'Calibri', sans-serif;font-size:15px;\">create a user</text>
                                </g>
                                <g transform=\"matrix(1,0,0,1,-36.1506,34.4522)\">
                                    <text x=\"62.863px\" y=\"43.078px\" style=\"font-family:'Calibri', sans-serif;font-size:15px;\">{{role}}</text>
                                </g>
                                <g transform=\"matrix(1.76232,0,0,1.76471,85.0211,15)\">
                                    <path d=\"M17,16.488C16.937,13.801 14.222,11.489 10.479,10.879L10.479,9.505C10.971,9.032 11.321,8.298 11.55,7.672C11.882,7.506 12.174,7.136 12.344,6.639C12.582,5.951 12.49,5.316 12.138,5.01C12.166,4.772 12.184,4.529 12.153,4.287C12.074,3.624 12.218,3.249 12.347,2.919C12.453,2.642 12.576,2.328 12.453,1.974C12.011,0.701 10.726,0 8.835,0L8.571,0.005C7.258,0.052 6.864,0.605 6.6,1.12C6.567,1.182 6.523,1.266 6.523,1.271C4.811,1.424 4.826,2.84 4.839,3.978L4.842,4.347C4.842,4.552 4.851,4.766 4.868,4.986C4.443,5.286 4.364,5.991 4.689,6.723C4.874,7.138 5.141,7.452 5.438,7.615C5.681,8.289 6.063,9.085 6.617,9.58L6.617,10.863C2.819,11.452 0.063,13.77 0,16.488L-0.012,17L17.011,17L17,16.488ZM1.054,16C1.446,13.906 3.913,12.179 7.176,11.796L7.617,11.744L7.617,9.078L7.401,8.928C7.008,8.656 6.61,7.981 6.311,7.077L6.228,6.796L5.934,6.745C5.881,6.726 5.726,6.592 5.604,6.317C5.529,6.149 5.5,6.005 5.492,5.902L6.002,6.045L5.906,5.296C5.864,4.966 5.842,4.645 5.842,4.346L5.839,3.966C5.824,2.625 5.89,2.332 6.612,2.267C7.157,2.219 7.364,1.818 7.488,1.578C7.638,1.286 7.768,1.035 8.608,1.004L8.835,1C9.664,1 11.114,1.169 11.504,2.282C11.504,2.325 11.452,2.459 11.414,2.557C11.269,2.931 11.05,3.496 11.16,4.41C11.184,4.598 11.153,4.834 11.12,5.085L11.031,5.89L11.472,5.842C11.48,5.946 11.468,6.111 11.397,6.314C11.3,6.603 11.155,6.752 11.16,6.768L10.8,6.768L10.686,7.11C10.403,7.963 10.036,8.607 9.677,8.878L9.479,9.028L9.479,11.754L9.917,11.809C13.128,12.21 15.558,13.932 15.947,16.001L1.054,16.001L1.054,16Z\" style=\"fill:rgb(113,147,172);fill-rule:nonzero;\"/>
                                </g>
                            </svg>`,
                createInput: `<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 200 100\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xml:space=\"preserve\" xmlns:serif=\"http://www.serif.com/\" style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;\">
                                <g transform=\"matrix(1,0,0,1,-6.0646,-5.60316)\">
                                    <path d=\"M194.463,35.3C194.463,24.094 185.365,14.997 174.16,14.997L37.97,14.997C26.764,14.997 17.666,24.094 17.666,35.3L17.666,75.906C17.666,87.112 26.764,96.21 37.97,96.21L174.16,96.21C185.365,96.21 194.463,87.112 194.463,75.906L194.463,35.3Z\" style=\"fill:rgb(218,241,253);stroke:rgb(113,147,173);stroke-width:1px;\"/>
                                </g>
                                <g transform=\"matrix(1,0,0,1,-17.7983,20.4127)\">
                                    <text x=\"44.957px\" y=\"43.078px\" style=\"font-family:'Calibri', sans-serif;font-size:15px;\">cr<tspan x=\"56.332px 63.795px 70.841px 75.704px 83.168px \" y=\"43.078px 43.078px 43.078px 43.078px 43.078px \">eate </tspan>an input</text>
                                </g>
                                <rect x=\"75.676\" y=\"21.325\" width=\"46.935\" height=\"16.348\" style=\"fill:none;stroke:rgb(113,147,172);stroke-width:2.46px;\"/>
                                <g transform=\"matrix(1.63333,0,0,0.957895,-47.9299,1.49742)\">
                                    <rect x=\"77.258\" y=\"23.039\" width=\"3.955\" height=\"12.525\" style=\"fill:rgb(113,147,172);\"/>
                                </g>
                                <g transform=\"matrix(1,0,0,1,-36.1506,34.4522)\">
                                    <text x=\"62.863px\" y=\"43.078px\" style=\"font-family:'Calibri', sans-serif;font-size:15px;\">{{input}}</text>
                                </g>
                            </svg>`,
                createPassword: `<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 200 100\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xml:space=\"preserve\" xmlns:serif=\"http://www.serif.com/\" style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;\">
                                <g transform=\"matrix(1,0,0,1,-6.0646,-5.60316)\">
                                    <path d=\"M194.463,35.3C194.463,24.094 185.365,14.997 174.16,14.997L37.97,14.997C26.764,14.997 17.666,24.094 17.666,35.3L17.666,75.906C17.666,87.112 26.764,96.21 37.97,96.21L174.16,96.21C185.365,96.21 194.463,87.112 194.463,75.906L194.463,35.3Z\" style=\"fill:rgb(218,241,253);stroke:rgb(113,147,173);stroke-width:1px;\"/>
                                </g>
                                <g transform=\"matrix(1,0,0,1,-17.7983,20.4127)\">
                                    <text x=\"44.957px\" y=\"43.078px\" style=\"font-family:'Calibri', sans-serif;font-size:15px;\">cr<tspan x=\"56.332px 63.795px 70.841px 75.704px 83.168px \" y=\"43.078px 43.078px 43.078px 43.078px 43.078px \">eate </tspan>a passw<tspan x=\"134.444px 142.355px 147.379px 155.26px \" y=\"43.078px 43.078px 43.078px 43.078px \">ord </tspan>input</text>
                                </g>
                                <rect x=\"75.676\" y=\"21.325\" width=\"46.935\" height=\"16.348\" style=\"fill:none;stroke:rgb(113,147,172);stroke-width:2.46px;\"/>
                                <g transform=\"matrix(1,0,0,1,-36.1506,34.4522)\">
                                    <text x=\"62.863px\" y=\"43.078px\" style=\"font-family:'Calibri', sans-serif;font-size:15px;\">{{input}}</text>
                                </g>
                                <g transform=\"matrix(0.843963,0,0,0.843963,25.9206,8.75822)\">
                                    <text x=\"59.578px\" y=\"43.078px\" style=\"font-family:'Calibri', sans-serif;font-size:36px;fill:rgb(113,147,172);\">*</text>
                                </g>
                            </svg>`,
                createButton: `<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 200 100\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xml:space=\"preserve\" xmlns:serif=\"http://www.serif.com/\" style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;\">
                                <g transform=\"matrix(1,0,0,1,-6.0646,-5.60316)\">
                                    <path d=\"M194.463,35.3C194.463,24.094 185.365,14.997 174.16,14.997L37.97,14.997C26.764,14.997 17.666,24.094 17.666,35.3L17.666,75.906C17.666,87.112 26.764,96.21 37.97,96.21L174.16,96.21C185.365,96.21 194.463,87.112 194.463,75.906L194.463,35.3Z\" style=\"fill:rgb(218,241,253);stroke:rgb(113,147,173);stroke-width:1px;\"/>
                                </g>
                                <g transform=\"matrix(1,0,0,1,-17.7983,20.4127)\">
                                    <path d=\"M121.927,42.412C121.927,42.554 121.918,42.665 121.898,42.745C121.879,42.826 121.848,42.886 121.807,42.925C121.765,42.964 121.708,43 121.634,43.034C121.561,43.069 121.474,43.098 121.374,43.122C121.274,43.147 121.167,43.166 121.052,43.181C120.937,43.196 120.826,43.203 120.719,43.203C120.372,43.203 120.077,43.158 119.833,43.067C119.588,42.977 119.39,42.84 119.236,42.657C119.082,42.474 118.968,42.242 118.895,41.962C118.822,41.681 118.785,41.35 118.785,40.969L118.785,37.117L115.511,37.117L115.511,40.793C115.511,41.247 115.578,41.59 115.713,41.822C115.847,42.054 116.088,42.17 116.434,42.17C116.547,42.17 116.647,42.159 116.734,42.137C116.822,42.115 116.901,42.092 116.969,42.068C117.037,42.043 117.096,42.02 117.145,41.998C117.193,41.976 117.237,41.965 117.276,41.965C117.301,41.965 117.324,41.971 117.346,41.983C117.368,41.996 117.385,42.019 117.397,42.053C117.41,42.087 117.421,42.134 117.43,42.192C117.44,42.251 117.445,42.324 117.445,42.412C117.445,42.495 117.443,42.561 117.438,42.61C117.433,42.659 117.427,42.704 117.419,42.745C117.412,42.787 117.4,42.823 117.383,42.855C117.366,42.887 117.339,42.919 117.302,42.95C117.266,42.982 117.211,43.014 117.137,43.045C117.064,43.077 116.979,43.104 116.881,43.126C116.783,43.148 116.678,43.166 116.566,43.181C116.454,43.196 116.341,43.203 116.229,43.203C115.887,43.203 115.594,43.158 115.35,43.067C115.106,42.977 114.906,42.84 114.75,42.657C114.593,42.474 114.48,42.242 114.409,41.962C114.338,41.681 114.303,41.35 114.303,40.969L114.303,37.117L113.38,37.117C113.307,37.117 113.248,37.077 113.204,36.999C113.16,36.921 113.138,36.794 113.138,36.618C113.138,36.526 113.144,36.448 113.157,36.384C113.169,36.321 113.185,36.268 113.204,36.227C113.224,36.185 113.249,36.156 113.281,36.139C113.313,36.122 113.348,36.113 113.387,36.113L114.303,36.113L114.303,34.546C114.303,34.512 114.311,34.48 114.328,34.451C114.346,34.421 114.377,34.396 114.424,34.374C114.47,34.352 114.532,34.336 114.61,34.326C114.689,34.316 114.786,34.311 114.903,34.311C115.026,34.311 115.126,34.316 115.204,34.326C115.282,34.336 115.343,34.352 115.387,34.374C115.431,34.396 115.463,34.421 115.482,34.451C115.502,34.48 115.511,34.512 115.511,34.546L115.511,36.113L118.785,36.113L118.785,34.231C118.785,34.192 118.795,34.158 118.815,34.128C118.834,34.099 118.867,34.076 118.913,34.059C118.96,34.042 119.022,34.027 119.1,34.015C119.178,34.003 119.276,33.996 119.393,33.996C119.51,33.996 119.608,34.003 119.686,34.015C119.764,34.027 119.827,34.042 119.873,34.059C119.919,34.076 119.952,34.099 119.972,34.128C119.991,34.158 120.001,34.192 120.001,34.231L120.001,36.113L121.686,36.113C121.725,36.113 121.759,36.122 121.788,36.139C121.818,36.156 121.843,36.185 121.865,36.227C121.887,36.268 121.903,36.321 121.913,36.384C121.922,36.448 121.927,36.526 121.927,36.618C121.927,36.794 121.905,36.921 121.861,36.999C121.818,37.077 121.761,37.117 121.693,37.117L120.001,37.117L120.001,40.793C120.001,41.247 120.067,41.59 120.199,41.822C120.331,42.054 120.57,42.17 120.917,42.17C121.024,42.17 121.123,42.159 121.213,42.137C121.304,42.115 121.383,42.092 121.451,42.068C121.52,42.043 121.579,42.02 121.631,41.998C121.682,41.976 121.725,41.965 121.759,41.965C121.788,41.965 121.813,41.971 121.832,41.983C121.852,41.996 121.868,42.019 121.88,42.053C121.892,42.087 121.903,42.134 121.913,42.192C121.922,42.251 121.927,42.324 121.927,42.412Z\"/>
                                    <text x=\"44.957px\" y=\"43.078px\" style=\"font-family:'Calibri', sans-serif;font-size:15px;\">cr<tspan x=\"56.332px 63.795px 70.841px 75.704px 83.168px \" y=\"43.078px 43.078px 43.078px 43.078px 43.078px \">eate </tspan>a bu<tspan x=\"122.264px \" y=\"43.078px \">o</tspan>n</text>
                                </g>
                                <path d=\"M125.115,23.204C125.115,20.202 122.679,17.765 119.677,17.765L87.31,17.765C84.309,17.765 81.872,20.202 81.872,23.204L81.872,34.08C81.872,37.082 84.309,39.519 87.31,39.519L119.677,39.519C122.679,39.519 125.115,37.082 125.115,34.08L125.115,23.204Z\" style=\"fill:none;stroke:rgb(113,147,172);stroke-width:2.46px;\"/>
                                <g transform=\"matrix(1,0,0,1,4.87805,0.922874)\">
                                    <text x=\"92.02px\" y=\"30.554px\" style=\"font-family:'Calibri-Bold', 'Calibri', sans-serif;font-weight:700;font-size:11px;fill:rgb(113,147,172);\">OK</text>
                                </g>
                                <g transform=\"matrix(1,0,0,1,-36.1506,34.4522)\">
                                    <text x=\"62.863px\" y=\"43.078px\" style=\"font-family:'Calibri', sans-serif;font-size:15px;\">{{button}}</text>
                                </g>
                            </svg>`,
                stopElement: `<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 50 100\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xml:space=\"preserve\" xmlns:serif=\"http://www.serif.com/\" style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;\">
                                <g transform=\"matrix(0.581621,0,0,0.581621,-13.475,-112.661)\">
                                    <circle cx=\"51.31\" cy=\"279.668\" r=\"20.632\" style=\"fill:rgb(210,135,115);stroke:rgb(155,19,0);stroke-width:1px;\"/>
                                </g>
                            </svg>`
            }

            var connections = [];
            function addElement() {
                connections.push({
                    source: ("#el" + oldElementIndex) + "",
                    target: ("#el" + newElementIndex) + "",
                    scope: workflowScope
                });
                oldElementIndex += 1;
                newElementIndex += 1;
            }
            function createElement(typedef, value, content, cls) {
                if (cls === undefined || cls === null || cls === "") {
                    cls = "action-element";
                }
                design += ("<div class=\"" + cls + "\" id=\"#el" + oldElementIndex + "\">" + content + "</div>") + "";
                addElement();
                script.push({
                    typeDef: typedef,
                    value: value
                });
            }

            var page = "", inputname = "", design = "", inputName = "", script = [];

            // First setup workflow container
            design = "<div class=\"workflow-container\"><div class=\"workflow-scroll\">";

            // Add the start elelement
            createElement("startElement", "start", elements.startElement,"start-element");

            if (action.includes(" login")) {
                // Create a user with the role that is known
                createElement("createUser", role, elements.createUser.replace("{{role}}", role));

                // Create a login page
                createElement("createPage", "login", elements.createPage.replace("{{page}}", "login"));

                // Create an input for the username.
                createElement("createInput", "username", elements.createInput.replace("{{input}}", "username"));

                // Create an input for the username.
                createElement("createPassword", "password", elements.createPassword.replace("{{input}}", "password"));

                // Create a button to login.
                createElement("createButton", "login", elements.createButton.replace("{{button}}", "login"));
            }

            if (result.includes(" homepage")) {
                // Create a login page=
                createElement("createPage", "homepage_" + role, elements.createPage.replace("{{page}}", "homepage_" + role));
            }

            createElement("stopElement", "stop", elements.stopElement,"stop-element");

            design += "</div></div>";
            
            $("#codeToCompile").html("<div class=\"codeToCompile\"><pre><code class=\"language-json\">" + JSON.stringify({
                name: 'sub' + '_' + role,
                description: val,
                actions: script
            }, null, 4) + "</code></pre></div>");

            $("#processFlow").html(design);

            $(".workflow-container").width($(document).width() - 200);
            $(".workflow-container").height(200);
            $(".workflow-container").css("margin-top", "50px;");

            Prism.highlightAll(function() {
            });

            connections.map(function (value, number) {
                console.log(value);
                workflowEngine.connect(value);
            });

        },
        interperKeyword: function (val, role, action, result) {

            val = "<i>" + val + "</i>";
            val = val.replace(role, " <span class=\"badge badge-success\">" + role + "</span>");

            if (action.includes(" login")) {
                val = val.replace(" login", " <span class=\"badge badge-success\">login</span>");
            }

            if (result.includes(" homepage")) {
                val = val.replace(" homepage", " <span class=\"badge badge-success\">homepage</span>");
            }

            $("#interpedState").html(val);

        },
        createDesign: function (role, action, result) {

            var design = "<table><tr>";

            if (action.includes(" login")) {
                design += "<td><div class=\"page\"><div class=\"username-label\">username</div><div class=\"username-field\"></div><div class=\"password-label\">password</div><div class=\"password-field\"></div><div class=\"login-button\">ok</div></div></td>";
                design += "<td><svg width=\"100\" height=\"50\" viewBox=\"0 0 100 50\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xml:space=\"preserve\" xmlns:serif=\"http://www.serif.com/\" style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;\">";
                design += "    <g transform=\"matrix(1,0,0,1,1.58207,3.32894)\">";
                design += "        <g transform=\"matrix(1,0,0,1,2.7027,-0.131839)\">";
                design += "            <path d=\"M3.691,21.869L87.673,21.869\" style=\"fill:none;stroke:black;stroke-width:1px;\"/>";
                design += "        </g>";
                design += "        <path d=\"M78.708,10.003L90.442,21.737L78.84,33.339\" style=\"fill:none;stroke:black;stroke-width:1px;\"/>";
                design += "    </g>";
                design += "</svg></td>";
            }

            if (result.includes(" homepage")) {
                design += "<td><div class=\"page\"><div class=\"homepage-label\">homepage</div><div class=\"role-label\">" + role + "</div></div></td>";
            }

            design += "</tr></table>";

            $("#compiledState").html(design);

        },
        execInterper: function (val) {
            val = val.toLowerCase();
            var roleParts = val.split("i want to");
            var role = roleParts[0].replace("as an", "").replace("as a").trim();
            var actionParts = roleParts[1].split("so that i");
            var action = actionParts[0];
            var result = actionParts[1];
            this.interperKeyword(val, role, action, result);
            this.createDesign(role, action, result);
            this.createWorkflow(val, role, action, result);
        }
    }

    $("#userStory").focus();

    $("#userStory").keyup(function (e) {
        var code = e.which; // recommended to use e.which, it's normalized across browsers
        if (code == 13) e.preventDefault();
        if (code == 13) {
            Core.execInterper($("#userStory").val());
        } // missing closing if brace
    });


});