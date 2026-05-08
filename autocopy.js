export default {
  async fetch(request) {
    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>自动复制工具</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .container {
            background: white;
            border-radius: 20px;
            padding: 30px 25px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            width: 100%;
            max-width: 500px;
        }
        
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 25px;
            font-size: 24px;
        }
        
        .input-wrapper {
            margin-bottom: 20px;
        }
        
        #textInput {
            width: 100%;
            min-height: 150px;
            padding: 15px;
            font-size: 16px;
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            resize: vertical;
            transition: all 0.3s;
            font-family: inherit;
        }
        
        #textInput:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .toggle-wrapper {
            margin-bottom: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .toggle-label {
            font-size: 15px;
            color: #333;
            font-weight: 500;
        }
        
        .toggle-desc {
            font-size: 12px;
            color: #666;
            margin-top: 3px;
        }
        
        .toggle-switch {
            position: relative;
            width: 50px;
            height: 28px;
            flex-shrink: 0;
        }
        
        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .3s;
            border-radius: 28px;
        }
        
        .slider:before {
            position: absolute;
            content: "";
            height: 20px;
            width: 20px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .3s;
            border-radius: 50%;
        }
        
        input:checked + .slider {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        input:checked + .slider:before {
            transform: translateX(22px);
        }
        
        .button-group {
            display: flex;
            gap: 10px;
        }
        
        button {
            flex: 1;
            padding: 15px;
            font-size: 16px;
            font-weight: 600;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s;
            color: white;
        }
        
        #clearBtn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        #clearBtn:active {
            transform: scale(0.98);
        }
        
        .status {
            margin-top: 15px;
            padding: 12px;
            text-align: center;
            border-radius: 8px;
            font-size: 14px;
            background: #f5f5f5;
            color: #666;
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .status.success {
            background: #d4edda;
            color: #155724;
        }
        
        .status.error {
            background: #f8d7da;
            color: #721c24;
        }
        
        .info {
            margin-top: 20px;
            padding: 15px;
            background: #e7f3ff;
            border-radius: 8px;
            font-size: 13px;
            color: #0066cc;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📋 自动复制工具</h1>
        
        <div class="input-wrapper">
            <textarea id="textInput" placeholder="在此输入内容，将每隔0.5秒自动复制到剪贴板..."></textarea>
        </div>
        
        <div class="toggle-wrapper">
            <div>
                <div class="toggle-label">自动清空模式</div>
                <div class="toggle-desc">输入后1秒自动清空，适合连续短输入</div>
            </div>
            <label class="toggle-switch">
                <input type="checkbox" id="autoClearToggle">
                <span class="slider"></span>
            </label>
        </div>
        
        <div class="button-group">
            <button id="clearBtn">🗑️ 清空并继续输入</button>
        </div>
        
        <div class="status" id="status">等待输入...</div>
        
        <div class="info">
            💡 提示：输入的内容会每隔0.5秒自动复制到剪贴板，点击按钮可快速清空并继续输入。
        </div>
    </div>

    <script>
        const textInput = document.getElementById('textInput');
        const clearBtn = document.getElementById('clearBtn');
        const status = document.getElementById('status');
        const autoClearToggle = document.getElementById('autoClearToggle');
        
        let lastCopiedText = '';
        let copyInterval = null;
        let autoClearTimer = null;
        
        // 从本地存储读取开关状态
        if (localStorage.getItem('autoClearEnabled') === 'true') {
            autoClearToggle.checked = true;
        }
        
        async function copyToClipboard(text) {
            try {
                if (!text) {
                    updateStatus('输入框为空', 'normal');
                    return;
                }
                
                if (text === lastCopiedText) {
                    return;
                }
                
                await navigator.clipboard.writeText(text);
                lastCopiedText = text;
                updateStatus('已复制 (' + text.length + '字符)', 'success');
                
                // 如果开启了自动清空，启动清空计时器
                if (autoClearToggle.checked) {
                    clearAutoClearTimer();
                    autoClearTimer = setTimeout(function() {
                        textInput.value = '';
                        lastCopiedText = '';
                        updateStatus('已自动清空，继续输入...', 'normal');
                        textInput.focus();
                    }, 1000);
                }
            } catch (err) {
                updateStatus('复制失败，请检查浏览器权限', 'error');
                console.error('复制失败:', err);
            }
        }
        
        function clearAutoClearTimer() {
            if (autoClearTimer) {
                clearTimeout(autoClearTimer);
                autoClearTimer = null;
            }
        }
        
        function updateStatus(message, type) {
            status.textContent = message;
            status.className = 'status';
            if (type === 'success') {
                status.classList.add('success');
            } else if (type === 'error') {
                status.classList.add('error');
            }
        }
        
        function startAutoCopy() {
            if (copyInterval) {
                clearInterval(copyInterval);
            }
            
            copyInterval = setInterval(function() {
                const text = textInput.value.trim();
                if (text) {
                    copyToClipboard(text);
                }
            }, 500);
        }
        
        // 清空按钮事件
        clearBtn.addEventListener('click', function() {
            textInput.value = '';
            lastCopiedText = '';
            clearAutoClearTimer();
            textInput.focus();
            updateStatus('已清空，继续输入...', 'normal');
        });
        
        // 开关切换事件
        autoClearToggle.addEventListener('change', function() {
            localStorage.setItem('autoClearEnabled', this.checked);
            if (this.checked) {
                updateStatus('已开启自动清空模式', 'success');
            } else {
                updateStatus('已关闭自动清空模式', 'normal');
                clearAutoClearTimer();
            }
        });
        
        // 输入时取消自动清空计时器（如果用户继续输入）
        textInput.addEventListener('input', function() {
            if (autoClearToggle.checked) {
                clearAutoClearTimer();
            }
        });
        
        textInput.addEventListener('focus', function() {
            startAutoCopy();
        });
        
        window.addEventListener('load', function() {
            textInput.focus();
            startAutoCopy();
        });
        
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) {
                startAutoCopy();
            }
        });
    </script>
</body>
</html>`;
    
    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
    });
  },
};
