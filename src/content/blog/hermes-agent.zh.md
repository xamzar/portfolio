---
title: "在GCP VM上运行Hermes Agent"
date: "2026-06-14"
tags: ["ai", "devops", "meta", "portfolio"]
excerpt: "我一直在使用Hermes Agent（由Nous Research开发）作为日常编码伙伴。以下是它的部署方式和使用体验。"
---

我在托管此作品集的同一台GCP VM上运行着一个名为[Hermes](https://hermes-agent.nousresearch.com)的AI代理。我是从Prof. Chan Chung和Dr. Zhao Chao那里了解到它的——今年夏天我正与他们合作，为DIVE和E-Quiz（CS1302A）进行AI增强。Prof. Chan是我的导师。Hermes作为systemd服务安装，通过Telegram与我连接，并且执行实际工作——不仅仅是聊天。我甚至用它登录过CityU的AIMS门户并在页面间导航。

## 环境配置

该VM是位于香港（`asia-east2-b`）的标准GCP e2实例。Hermes作为持久化守护进程运行。我通过Telegram与其交流进行快速查询，或通过SSH进入CLI进行深度专注工作。两种模式切换自然——日常问题走Telegram，编码会话走终端。

它可以访问文件系统、浏览器、网络搜索工具，并且可以执行任意命令。它本质上是一个驻留在我服务器上的编码伙伴。

## 与众不同之处

最让我惊讶的是Hermes确实会*完成*任务。它不会在写完计划或执行一条命令后就停下来——它会持续工作，直到项目被构建、测试并推送。你正在阅读的这个[作品集网站](https://xmzr.dev)完全是通过Hermes构建的：项目脚手架、Git设置、GitHub仓库创建、Cloudflare Tunnel配置、DNS记录——整个流程。它自己搞定了Cloudflare Tunnel的入口规则，无需我手把手指导。

我经常使用的一些功能：

- **跨会话记忆**——它能记住我的偏好、环境特点和项目约定。同一个问题不会问两遍。
- **技能（Skills）**——解决棘手问题后可重复使用的工作流程。下次它会加载该技能并避免同样的陷阱。
- **定时任务**——我可以安排它按计时器执行任务。检查某件事、总结某件事、汇报结果。
- **子代理委派**——它可以生成并行工作进程进行调研或调试，同时保持我的对话整洁。
- **浏览器自动化**——它可以登录CityU AIMS等门户，通过具有多因素认证的Okta SSO，并从大学系统中提取信息。

## 模型

底层使用DeepSeek API。我日常使用**deepseek-v4-flash**——足够快以支持实时聊天，也足够强大以编写生产代码。当需要更多推理能力时，我切换至**deepseek-v4-pro**。价格便宜得离谱：过去两天里探索所有功能我只花了大约5元人民币（约0.70美元）。

## 工作流程

在Telegram上，我会说"为xmzr.dev设置Cloudflare Tunnel"之类的话，它就会出发，安装cloudflared，创建隧道，配置入口规则，设置systemd，测试连接，并在服务上线后汇报给我。没有进度更新，除非遇到阻碍。只有结果。

对于重要工作，我会通过SSH登录并直接使用CLI——这是同一个代理，但拥有完整的终端访问权限且没有消息长度限制。

[Hermes文档](https://hermes-agent.nousresearch.com/docs)很完善，而且它是开源的。如果你运行Linux机器并编写代码，值得一试。
