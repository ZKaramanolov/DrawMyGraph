const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
//g contains all nodes
const g = new Graph();
//selected node with mouse
var selected = new Node(0);
//is it active to linking
var activatedLinking = false;
//adding Listener for node click
document.addEventListener('click', Selection.selection);
//id for creating nodes
var globalId = 1;
//remove load panel on clicking blur
document.querySelector("#blur").addEventListener('click', fillLoad);
//is it chose save or load
var typeLoad = "";
//starting node for search
var startNode;
//end node for search
var endNode;
//stack for search algorithms
var stack = [];
//queue for search algorithms
var queue = [];
//flag for first displayPath
var havePath = false;
//flag for displayPath2
var havePath2 = false;
//mid start node for search algorithm
var tempStart;
//mid end node for search algorithm
var tempEnd;
//Array for the Path2 displayPath2
var path = [];
