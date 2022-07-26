import { Component, OnInit, AfterViewInit, AfterViewChecked, ElementRef, ViewChild, Injector, Input, Output, EventEmitter, Injectable } from '@angular/core';


import * as _ from 'lodash';
import { PermissionTreeEditModel } from './permission-tree-edit.model';
import { AppComponentBase } from '../../../../../core/shared/app-component-base';
import { FlatPermissionDto } from '../model/permission.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import { FlatTreeControl } from '@angular/cdk/tree';
import { BehaviorSubject } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';

declare let $: any;


export class TodoItemNode {
	children: TodoItemNode[];
	//item: string;
	Permission: FlatPermissionDto;
	Selected: boolean;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
	//item: string;
	level: number;
	Permission: FlatPermissionDto;
	expandable: boolean;
	Selected: boolean;
}




@Component({
	selector: 'permission-tree',
	templateUrl: './permission-tree.component.html'
})
export class PermissionTreeComponent extends AppComponentBase implements OnInit, AfterViewInit, AfterViewChecked {



	private GetChildenPermisions(val: PermissionTreeEditModel, item: FlatPermissionDto): TodoItemNode[] {

		let self = this;

		var childrens = val.Permissions.filter(e => e.ParentName == item.Name);

		let treeData = _.map(childrens, function (item) {


			var result = new TodoItemNode();
			result.Permission = item;
			result.Selected = _.includes(val.GrantedPermissionNames, item.Name);

			result.children = self.GetChildenPermisions(val, item);

			return result;
		});

		return treeData;

	}

	set editData(val: PermissionTreeEditModel) {

		var root = val.Permissions.filter(e => !e.ParentName);

		let self = this;

		let treeData = _.map(root, function (item) {


			var result = new TodoItemNode();
			result.Permission = item;
			//result.item = item.Description;
			result.children = self.GetChildenPermisions(val, item);
			result.Selected = _.includes(val.GrantedPermissionNames, item.Name);
			if (result.Selected) {

			}
			return result;
		});

		this.dataSource.data = treeData;


		this.treeControl.dataNodes.forEach(node => {
			if (node.Selected) {
				this.checklistSelection.toggle(node);
			}			
		})

	}


	selectedParent: TodoItemFlatNode | null = null;

	newItemName = '';

	treeControl: FlatTreeControl<TodoItemFlatNode>;
	treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;
	dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

	nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();
	flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

	private _$tree: any;
	private _editData: PermissionTreeEditModel;
	Permissions: FlatPermissionDto[];

	private _createdTreeBefore;

	checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);


	constructor(private _element: ElementRef,
		injector: Injector
	) {
		super(injector);
		this.Permissions = [];



		this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
			this.isExpandable, this.getChildren);
		this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
		this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

		//database.dataChange.subscribe(data => {
		//	this.dataSource.data = data;
		//});
	}


	getLevel = (node: TodoItemFlatNode) => node.level;
	isExpandable = (node: TodoItemFlatNode) => node.expandable;

	getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

	hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

	hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.Permission.Name === '';

	transformer = (node: TodoItemNode, level: number) => {
		const existingNode = this.nestedNodeMap.get(node);
		const flatNode = existingNode && existingNode.Permission.Name === node.Permission.Name
			? existingNode
			: new TodoItemFlatNode();
		flatNode.Permission = node.Permission;
		flatNode.level = level;
		flatNode.expandable = !!node.children && node.children.length > 0;
		flatNode.Selected = node.Selected;
		this.flatNodeMap.set(flatNode, node);
		this.nestedNodeMap.set(node, flatNode);
		return flatNode;
	}


	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		
		//this._$tree = $(this._element.nativeElement);

		//this.refreshTree();
	}

	ngAfterViewChecked(): void {

	}

	getGrantedPermissionNames(): string[] {



		let permissionNames = [];

		//let selectedPermissions = this._$tree.jstree('get_selected', true);
		var s = this.checklistSelection.selected;

		s.forEach(e =>
			permissionNames.push(e.Permission.Name)
		);

 

		return permissionNames;
	}


	descendantsAllSelected(node: TodoItemFlatNode): boolean {

		try {
			node.Selected = true;
			const descendants = this.treeControl.getDescendants(node);

			if (descendants.length === 0)
				return this.checklistSelection.isSelected(node);

			return descendants.every(child => this.checklistSelection.isSelected(child));
		} catch (e) {
			return this.checklistSelection.isSelected(node);
		} 
	}

	/** Whether part of the descendants are selected */
	descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
		try {
			node.Selected = true;
			const descendants = this.treeControl.getDescendants(node);

			const result = descendants.some(child => this.checklistSelection.isSelected(child));
			return result && !this.descendantsAllSelected(node);
		} catch (e) {
			return false;
		}


	}

	/** Toggle the to-do item selection. Select/deselect all the descendants node */
	todoItemSelectionToggle(node: TodoItemFlatNode): void {
		this.checklistSelection.toggle(node);
		const descendants = this.treeControl.getDescendants(node);
		this.checklistSelection.isSelected(node)
			? this.checklistSelection.select(...descendants)
			: this.checklistSelection.deselect(...descendants);
	}

	///** Select the category so we can insert the new item. */
	//addNewItem(node: TodoItemFlatNode) {
	//	const parentNode = this.flatNodeMap.get(node);
	//	this.database.insertItem(parentNode!, '');
	//	this.treeControl.expand(node);
	//}

	///** Save the node to database */
	//saveNode(node: TodoItemFlatNode, itemValue: string) {
	//	const nestedNode = this.flatNodeMap.get(node);
	//	this.database.updateItem(nestedNode!, itemValue);
	//}

	refreshTree(): void {

		//let self = this;

		//if (this._createdTreeBefore) {
		//    this._$tree.jstree('destroy');
		//}

		//this._createdTreeBefore = false;

		//if (!this._editData || !this._$tree) {
		//    return;
		//}


		//let treeData = _.map(this._editData.Permissions, function(item) {
		//    return {
		//        id: item.Name,
		//        parent: item.ParentName ? item.ParentName : '#',
		//        text: item.DisplayName,
		//        state: {
		//            opened: true,
		//            selected: _.includes(self._editData.GrantedPermissionNames, item.Name)
		//        }
		//    };
		//});


		//this._$tree.jstree({
		//        "core": {
		//            //"multiple": true,
		//            "data": treeData,
		//        },
		//        "checkbox": {
		//            "keep_selected_style": true
		//        },
		//        "plugins": ["wholerow", "checkbox"],
		//    });


		//this._createdTreeBefore = true;

		//let inTreeChangeEvent = false;

		//this._$tree.jstree({
		//    'core': {
		//        data: treeData
		//    },
		//    'types': {
		//        'default': {
		//            'icon': 'fa fa-folder m--font-warning'
		//        },
		//        'file': {
		//            'icon': 'fa fa-file m--font-warning'
		//        }
		//    },
		//    'checkbox': {
		//        keep_selected_style: false,
		//        three_state: true,
		//        //cascade: ''
		//    },
		//    plugins: ['checkbox', 'types']
		//});

		//this._createdTreeBefore = true;

		//let inTreeChangeEvent = false;

		//function selectNodeAndAllParents(node) {
		//    self._$tree.jstree('select_node', node, true);
		//    let parent = self._$tree.jstree('get_parent', node);
		//    if (parent) {
		//        selectNodeAndAllParents(parent);
		//    }
		//}

		//this._$tree.on('changed.jstree', function (e, data) {
		//    debugger
		//    if (!data.node) {
		//        return;
		//    }

		//    let wasInTreeChangeEvent = inTreeChangeEvent;
		//    if (!wasInTreeChangeEvent) {
		//        inTreeChangeEvent = true;
		//    }

		//    let childrenNodes;

		//    if (data.node.state.selected) {
		//        selectNodeAndAllParents(self._$tree.jstree('get_parent', data.node));

		//        childrenNodes = $.makeArray(self._$tree.jstree('get_children_dom', data.node));
		//        self._$tree.jstree('select_node', childrenNodes);

		//    } else {
		//        childrenNodes = $.makeArray(self._$tree.jstree('get_children_dom', data.node));
		//        self._$tree.jstree('deselect_node', childrenNodes);
		//    }

		//    if (!wasInTreeChangeEvent) {
		//        inTreeChangeEvent = false;
		//    }
		//});
	}
}
