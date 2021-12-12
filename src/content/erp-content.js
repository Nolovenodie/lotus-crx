function initHtml() {
	setInterval(() => {
		console.log($(".app-main .el-table__body-wrapper .el-table__row.expanded").length);
		$(".app-main .el-table__body-wrapper .el-table__row.expanded").each((index, element) => {
			let line = $(element),
				body = line.next().find(".demo-table-expand"),
				orderId = line.find(".el-link--inner").text();

			// 跳过/刷新
			let tool = body.find("#lotus-tool-erp");
			if (tool.length > 0) {
				if (tool.attr("order-id") == orderId) {
					return;
				} else {
					tool.remove();
				}
			}

			console.log(tool, orderId);

			let flag = null;
			// 获取
			// getOrderInfo(orderId, (success, data) => {
			// if (success) {
			let html = "\
            <div id='lotus-tool-erp' class='mdui-theme-layout-dark mdui-shadow-7 mdui-color-grey-900' order='" + orderId + "'>\
                <div id='lotus-tool-erp-content' class='mdui-table-fluid'>\
                    <div class='lotus-tool-erp-flag-list'>\
                        <div class='lotus-tool-erp-flag' flag='1'>\
                            <svg viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='2316' width='22' height='22'><path d='M867.632 201.776c-5.408-5.376-11.776-8.08-19.136-8.08-3.664 0-11.392 3.008-23.136 8.944-11.76 5.952-24.24 12.576-37.376 19.968-13.168 7.344-28.752 14-46.736 19.952-17.968 5.936-34.608 8.944-49.92 8.944-14.144 0-26.624-2.688-37.376-8.08-35.664-16.704-66.688-29.168-93.024-37.392-26.336-8.208-54.656-12.336-84.976-12.336-52.352 0-111.984 17.024-178.832 51.008-13.792 6.88-23.68 12.208-30.08 16.112l-6.352-46.576c14.352-12.464 23.616-30.624 23.616-51.12 0-37.552-30.432-67.984-67.984-67.984-37.552 0-67.984 30.432-67.984 67.984 0 24.496 13.088 45.792 32.512 57.76l91.84 673.44c2.736 20.048 19.888 34.592 39.584 34.592 1.792 0 3.616-0.112 5.456-0.352 21.888-3.008 37.216-23.152 34.224-45.04L315.04 612.848c66.976-33.232 124.912-49.984 173.648-49.984 20.688 0 40.864 3.088 60.528 9.328 19.68 6.256 36.048 13.04 49.072 20.384 13.024 7.36 28.4 14.176 46.08 20.384 17.712 6.24 35.2 9.36 52.464 9.36 43.616 0 95.856-16.432 156.736-49.28 7.648-3.968 13.248-7.872 16.784-11.696 3.536-3.824 5.312-9.264 5.312-16.336L875.664 220.896C875.664 213.552 872.992 207.168 867.632 201.776z' p-id='2317'></path></svg>\
                        </div>\
                        <div class='lotus-tool-erp-flag' flag='2'>\
                            <svg viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='2316' width='22' height='22'><path d='M867.632 201.776c-5.408-5.376-11.776-8.08-19.136-8.08-3.664 0-11.392 3.008-23.136 8.944-11.76 5.952-24.24 12.576-37.376 19.968-13.168 7.344-28.752 14-46.736 19.952-17.968 5.936-34.608 8.944-49.92 8.944-14.144 0-26.624-2.688-37.376-8.08-35.664-16.704-66.688-29.168-93.024-37.392-26.336-8.208-54.656-12.336-84.976-12.336-52.352 0-111.984 17.024-178.832 51.008-13.792 6.88-23.68 12.208-30.08 16.112l-6.352-46.576c14.352-12.464 23.616-30.624 23.616-51.12 0-37.552-30.432-67.984-67.984-67.984-37.552 0-67.984 30.432-67.984 67.984 0 24.496 13.088 45.792 32.512 57.76l91.84 673.44c2.736 20.048 19.888 34.592 39.584 34.592 1.792 0 3.616-0.112 5.456-0.352 21.888-3.008 37.216-23.152 34.224-45.04L315.04 612.848c66.976-33.232 124.912-49.984 173.648-49.984 20.688 0 40.864 3.088 60.528 9.328 19.68 6.256 36.048 13.04 49.072 20.384 13.024 7.36 28.4 14.176 46.08 20.384 17.712 6.24 35.2 9.36 52.464 9.36 43.616 0 95.856-16.432 156.736-49.28 7.648-3.968 13.248-7.872 16.784-11.696 3.536-3.824 5.312-9.264 5.312-16.336L875.664 220.896C875.664 213.552 872.992 207.168 867.632 201.776z' p-id='2317'></path></svg>\
                        </div>\
                        <div class='lotus-tool-erp-flag' flag='3'>\
                            <svg viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='2316' width='22' height='22'><path d='M867.632 201.776c-5.408-5.376-11.776-8.08-19.136-8.08-3.664 0-11.392 3.008-23.136 8.944-11.76 5.952-24.24 12.576-37.376 19.968-13.168 7.344-28.752 14-46.736 19.952-17.968 5.936-34.608 8.944-49.92 8.944-14.144 0-26.624-2.688-37.376-8.08-35.664-16.704-66.688-29.168-93.024-37.392-26.336-8.208-54.656-12.336-84.976-12.336-52.352 0-111.984 17.024-178.832 51.008-13.792 6.88-23.68 12.208-30.08 16.112l-6.352-46.576c14.352-12.464 23.616-30.624 23.616-51.12 0-37.552-30.432-67.984-67.984-67.984-37.552 0-67.984 30.432-67.984 67.984 0 24.496 13.088 45.792 32.512 57.76l91.84 673.44c2.736 20.048 19.888 34.592 39.584 34.592 1.792 0 3.616-0.112 5.456-0.352 21.888-3.008 37.216-23.152 34.224-45.04L315.04 612.848c66.976-33.232 124.912-49.984 173.648-49.984 20.688 0 40.864 3.088 60.528 9.328 19.68 6.256 36.048 13.04 49.072 20.384 13.024 7.36 28.4 14.176 46.08 20.384 17.712 6.24 35.2 9.36 52.464 9.36 43.616 0 95.856-16.432 156.736-49.28 7.648-3.968 13.248-7.872 16.784-11.696 3.536-3.824 5.312-9.264 5.312-16.336L875.664 220.896C875.664 213.552 872.992 207.168 867.632 201.776z' p-id='2317'></path></svg>\
                        </div>\
                        <div class='lotus-tool-erp-flag' flag='4'>\
                            <svg viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='2316' width='22' height='22'><path d='M867.632 201.776c-5.408-5.376-11.776-8.08-19.136-8.08-3.664 0-11.392 3.008-23.136 8.944-11.76 5.952-24.24 12.576-37.376 19.968-13.168 7.344-28.752 14-46.736 19.952-17.968 5.936-34.608 8.944-49.92 8.944-14.144 0-26.624-2.688-37.376-8.08-35.664-16.704-66.688-29.168-93.024-37.392-26.336-8.208-54.656-12.336-84.976-12.336-52.352 0-111.984 17.024-178.832 51.008-13.792 6.88-23.68 12.208-30.08 16.112l-6.352-46.576c14.352-12.464 23.616-30.624 23.616-51.12 0-37.552-30.432-67.984-67.984-67.984-37.552 0-67.984 30.432-67.984 67.984 0 24.496 13.088 45.792 32.512 57.76l91.84 673.44c2.736 20.048 19.888 34.592 39.584 34.592 1.792 0 3.616-0.112 5.456-0.352 21.888-3.008 37.216-23.152 34.224-45.04L315.04 612.848c66.976-33.232 124.912-49.984 173.648-49.984 20.688 0 40.864 3.088 60.528 9.328 19.68 6.256 36.048 13.04 49.072 20.384 13.024 7.36 28.4 14.176 46.08 20.384 17.712 6.24 35.2 9.36 52.464 9.36 43.616 0 95.856-16.432 156.736-49.28 7.648-3.968 13.248-7.872 16.784-11.696 3.536-3.824 5.312-9.264 5.312-16.336L875.664 220.896C875.664 213.552 872.992 207.168 867.632 201.776z' p-id='2317'></path></svg>\
                        </div>\
                        <div class='lotus-tool-erp-flag' flag='5'>\
                            <svg viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='2316' width='22' height='22'><path d='M867.632 201.776c-5.408-5.376-11.776-8.08-19.136-8.08-3.664 0-11.392 3.008-23.136 8.944-11.76 5.952-24.24 12.576-37.376 19.968-13.168 7.344-28.752 14-46.736 19.952-17.968 5.936-34.608 8.944-49.92 8.944-14.144 0-26.624-2.688-37.376-8.08-35.664-16.704-66.688-29.168-93.024-37.392-26.336-8.208-54.656-12.336-84.976-12.336-52.352 0-111.984 17.024-178.832 51.008-13.792 6.88-23.68 12.208-30.08 16.112l-6.352-46.576c14.352-12.464 23.616-30.624 23.616-51.12 0-37.552-30.432-67.984-67.984-67.984-37.552 0-67.984 30.432-67.984 67.984 0 24.496 13.088 45.792 32.512 57.76l91.84 673.44c2.736 20.048 19.888 34.592 39.584 34.592 1.792 0 3.616-0.112 5.456-0.352 21.888-3.008 37.216-23.152 34.224-45.04L315.04 612.848c66.976-33.232 124.912-49.984 173.648-49.984 20.688 0 40.864 3.088 60.528 9.328 19.68 6.256 36.048 13.04 49.072 20.384 13.024 7.36 28.4 14.176 46.08 20.384 17.712 6.24 35.2 9.36 52.464 9.36 43.616 0 95.856-16.432 156.736-49.28 7.648-3.968 13.248-7.872 16.784-11.696 3.536-3.824 5.312-9.264 5.312-16.336L875.664 220.896C875.664 213.552 872.992 207.168 867.632 201.776z' p-id='2317'></path></svg>\
                        </div>\
                        <button id='lotus-tool-erp-button' class='mdui-btn mdui-color-grey-800 mdui-btn-block'>保存</button>\
                    </div>\
                    <input id='lotus-tool-erp-input' class='mdui-textfield-input' type='text' placeholder='请输入备注信息' align='center'/>\
                </div>\
            </div>";

			html = $(html);
			html.attr("order-id", orderId);

			html.find(".lotus-tool-erp-flag:eq(" + flag + ")").addClass("flag-select");
			html.find(".lotus-tool-erp-flag").click((e) => {
				selectFlag(e, orderId);
			});
			html.find("#lotus-tool-erp-button").click((e) => {
				saveInfo(e, orderId);
			});

			body.prepend(html);
			// 	}
			// });
		});
	}, 500);
}

function selectFlag(e, orderId) {
	let body = $("#lotus-tool-erp[order=" + orderId + "]");

	body.find(".flag-select").removeClass("flag-select");
	$(e.target).addClass("flag-select");
}
function saveInfo(e, orderId) {
	let body = $("#lotus-tool-erp[order=" + orderId + "]");

	console.log(orderId);
}

function initTool() {
	selectWait(".app-main .el-table__body-wrapper .el-table__row.expanded", initHtml, 100, 500);
}

initTool();
