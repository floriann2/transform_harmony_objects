/**
 * Author: Florian Ntibarigobeka
 * Date: October 9th, 2021
 */

var sourceValue = {};

function copyRotation() {
    /**
     * Copy the rotation value from a drawing layer
     */
    var sourceNode = selection.selectedNode(0);
    if (!sourceNode) {
        MessageBox.information("Please select a source node");
        return;
    }
    sourceValue = {z: undefined, stored: false};
    // Rotation Value
    sourceValue.z = node.getAttr(sourceNode, 1, "rotation.anglez");
    if (sourceValue.z) {
        sourceValue.stored = true;
    }
    if (sourceValue.stored) {
        this.ui.sourceLabel.setText(node.getName(sourceNode))
    }
    else {
        this.ui.sourceLabel.setText('')
        MessageBox.information("No rotation value found for " + node.getName(sourceNode))
    }
}

function copySkew() {
    /**
     * Copy the skew value from a drawing layer
     */
    var sourceNode = selection.selectedNode(0);
    if (!sourceNode) {
        MessageBox.information("Please select a source node");
        return;
    }
    sourceValue = {skew: undefined, stored: false};
    // Skew Value
    sourceValue.skew = node.getAttr(sourceNode, 1, "skew");
    if (sourceValue.skew) {
        sourceValue.stored = true;
    }
    if (sourceValue.stored) {
        this.ui.sourceLabel.setText(node.getName(sourceNode))
    }
    else {
        this.ui.sourceLabel.setText('')
        MessageBox.information("No skew value found for " + node.getName(sourceNode))
    }
}

function pasteRotation() {
    /**
     * Paste rotation value from the source to the destination
     */
    var attrValue = sourceValue.z.doubleValue();
    if (!sourceValue.stored) {
        MessageBox.information("No rotation or skew copied");
        return;
    }
    scene.beginUndoRedoAccum("Paste Rotation");
    var pathNodes = selection.selectedNodes();
    var nList = [];
    var currFrame = frame.current();

    for (var i = 0 ; i < pathNodes.length; i++) {
        var destinationNode = pathNodes[i];
        var shortName = node.getName(destinationNode);
        nList.push(' ' + shortName);
        node.setTextAttr(destinationNode, "rotation.anglez", currFrame, attrValue);        
    }

    MessageLog.trace("Destination: " + nList);
    scene.endUndoRedoAccum();
    
}

function pasteSkew() {
    /**
     * Paste skew value from the source to the destination node
     */
     var attrValue = sourceValue.skew.doubleValue();
    if (!sourceValue.stored) {
        MessageBox.information("No rotation or skew copied");
        return;
    }
    scene.beginUndoRedoAccum("Paste Skew");
    var pathNodes = selection.selectedNodes();
    var nList = [];
    var currFrame = frame.current();

    for (var i = 0 ; i < pathNodes.length; i++) {
        var destinationNode = pathNodes[i];
        var shortName = node.getName(destinationNode);
        nList.push(' ' + shortName);
        node.setTextAttr(destinationNode, "skew", currFrame, attrValue);        
    }

    MessageLog.trace("Destination: " + nList);
    scene.endUndoRedoAccum();
    
}

function copyTransformation() {
    /**
     * Main function to load in Ui
     */
    var uiFile = "D:\\dev_misc\\test\\scripts\\CopyTransformation.ui";
    this.ui = UiLoader.load(uiFile);

    this.ui.closeButton.clicked.connect(this.ui.close);
    this.ui.copyBox.copyRotationButton.clicked.connect(this, this.copyRotation);
    this.ui.copyBox.copySkewButton.clicked.connect(this, this.copySkew);
    this.ui.pasteBox.pasteRotationButton.clicked.connect(this, this.pasteRotation);
    this.ui.pasteBox.pasteSkewButton.clicked.connect(this, this.pasteSkew);

    this.ui.show();
}