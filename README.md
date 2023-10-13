### 不同git项目，使用不同用户名和邮箱

修改配置文件 ~/.gitconfig

```cmd
[core]
	autocrlf = false
[includeIf "gitdir:D:/bestime/git/"]
	path = D:/bestime/config/.gitconfig
[includeIf "gitdir:D:/work-qssoft/git/qs-t/"]
	path = D:/bestime/config/qssoft.gitconfig
[includeIf "gitdir:D:/work-qssoft/git/rdc-cq/"]
	path = D:/bestime/config/sitian.gitconfig

```