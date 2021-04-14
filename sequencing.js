$scope.attributelist = [{visible_name: "one"}, {visible_name: "two"}, {visible_name: "three"}, {visible_name: "four"}, {visible_name: "five"}, {visible_name: "six"}];
    $scope.panels = [];
    $scope.selectedAttributes = [];
    // functions for member panels section
    $scope.appendPanel = function(index) {
        var el = document.createElement('div');
        el.draggable = true;
        el.ondragstart = function(ev) {
            ev.dataTransfer.setData('index', index);
        }
        el.innerText = $scope.panels[index].panelName;
        var cross = document.createElement('span');
        cross.classList.add('glyphicon');
        cross.classList.add('glyphicon-remove');
        cross.classList.add('remove-sign');
        el.appendChild(cross);
        el.classList.add('panel-content');
        var container = document.getElementById(index + 1);
        container.appendChild(el);
        container.classList.remove('dashed-border');
        cross.addEventListener('click', function() {
            container.classList.add('dashed-border');
            $scope.removePanel(index);
        });
    }
    $scope.createPanel = function(name) {
        if (name === undefined || name==='')
            return;
        var index = $scope.panels.length;
        if (index>=11)
            return;
        $scope.panels.push({panelName: name, attributes: []});
        $scope.appendPanel(index);
    }
    $scope.clearPanels = function() {
        for (var i = 0;i<$scope.panels.length;i++) {
            var val = i + 1;
            var temp = document.getElementById(val);
            while(temp.firstChild!==undefined && temp.firstChild!==null) {
                temp.removeChild(temp.firstChild);
            }
            temp.classList.add('dashed-border');
        }
    }
    $scope.displayPanels = function() {
        for (var i=0;i<$scope.panels.length;i++) {
            $scope.appendPanel(i);
        }
    }
    $scope.removePanel = function(index) {
        var tempPanels = [];
        for (var i = 0;i<$scope.panels.length;i++) {
            if (i!==index) {
                tempPanels.push($scope.panels[i]);
            }
        }
        $scope.clearPanels();
        $scope.panels = tempPanels;
        $scope.displayPanels();
    }
    $scope.allowPanelDrop = function() {
        var panelboxes = document.getElementsByClassName('panel-box');
        for (var i=1;i<panelboxes.length;i++) {
            panelboxes[i].ondragover = function(ev) {
                ev.preventDefault();
            }
            panelboxes[i].ondrop = $scope.onPanelDrop;
        }
    }
    $scope.onPanelDrop = function(ev) {
        ev.preventDefault();
        var data = Number.parseInt(ev.dataTransfer.getData('index'));
        var targetIndex = Number.parseInt(ev.currentTarget.id) - 1;
        if (data === targetIndex) {
            return;
        }
        var tempPanels = [];
        $scope.clearPanels();
        for (var i=0;i<$scope.panels.length;i++) {
            if (i!==data) {
                if (i===targetIndex) {
                    tempPanels.push($scope.panels[data]);
                }
                tempPanels.push($scope.panels[i]);
            }
        }
        if (targetIndex>=$scope.panels.length) {
            tempPanels.push($scope.panels[data]);
        }
        $scope.panels = tempPanels;
        $scope.displayPanels();
    }

    // functions for member attributes section
    $scope.onAttributeDrop = function(ev) {
        ev.preventDefault();
        var data = Number.parseInt(ev.dataTransfer.getData('index'));
        var targetIndex = Number.parseInt(ev.currentTarget.id) - 13;
        if (data === targetIndex) {
            return;
        }
        var tempAttributes = [];
        $scope.clearAttributes();
        for (var i=0;i<$scope.selectedAttributes.length;i++) {
            if (i!==data) {
                if (i===targetIndex) {
                    tempAttributes.push($scope.selectedAttributes[data]);
                }
                tempAttributes.push($scope.selectedAttributes[i]);
            }
        }
        if (targetIndex>=$scope.selectedAttributes.length) {
            tempAttributes.push($scope.selectedAttributes[data]);
        }
        $scope.selectedAttributes = tempAttributes;
        $scope.displayAttributes();
    }
    $scope.displayAttributes = function() {
        for (var i=0;i<$scope.selectedAttributes.length;i++) {
            $scope.appendAttribute(i);
        }
    }
    $scope.clearAttributes = function() {
        for (var i = 0;i<$scope.selectedAttributes.length;i++) {
            var val = i + 13;
            var temp = document.getElementById(val);
            while(temp.firstChild!==undefined && temp.firstChild!==null) {
                temp.removeChild(temp.firstChild);
            }
            var el = document.createElement('span');
            el.classList.add('glyphicon');
            el.classList.add('glyphicon-plus');
            temp.appendChild(el);
            temp.classList.add('dashed-border');
        }
    }
    $scope.removeAttribute = function(index) {
        var tempAttributes = [];
        for (var i = 0;i<$scope.selectedAttributes.length;i++) {
            if (i!==index) {
                tempAttributes.push($scope.selectedAttributes[i]);
            }
        }
        $scope.clearAttributes();
        $scope.selectedAttributes = tempAttributes;
        $scope.displayAttributes();
    }
    $scope.appendAttribute = function(index) {
        var el = document.createElement('div');
        el.draggable = true;
        el.ondragstart = function(ev) {
            ev.dataTransfer.setData('index', index);
        }
        el.innerText = $scope.selectedAttributes[index].visible_name;
        var cross = document.createElement('span');
        cross.classList.add('glyphicon');
        cross.classList.add('glyphicon-remove');
        el.appendChild(cross);
        el.classList.add('attribute-content');
        var container = document.getElementById(index + 13);
        container.appendChild(el);
        container.classList.remove('dashed-border');
        cross.addEventListener('click', function() {
            container.classList.add('dashed-border');
            $scope.removeAttribute(index);
        });
    }
    $scope.createAttribute = function(attr) {
        var index = $scope.selectedAttributes.length;
        $scope.selectedAttributes.push({visible_name: attr.visible_name});
        $scope.appendAttribute(index);
    }
    $scope.allowAttributeDrop = function() {
        var attributeboxes = document.getElementsByClassName('attribute-box');
        for (var i=0;i<attributeboxes.length;i++) {
            attributeboxes[i].ondragover = function(ev) {
                ev.preventDefault();
            }
            attributeboxes[i].ondrop = $scope.onAttributeDrop;
        }
    }
    $scope.allowPanelDrop();
    $scope.allowAttributeDrop();
