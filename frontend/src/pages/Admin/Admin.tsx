import {FC, useContext, useEffect, useState} from 'react'
import './Admin.scss'
import { LoginContext, InfoContext } from '../../components/App/App'
import { Button, Checkbox, Form, Input, Popconfirm, Skeleton, Space, Switch, Tabs, Tooltip } from 'antd'
import { CheckOutlined, CloseOutlined, DotChartOutlined, FileAddOutlined, FormOutlined, InfoCircleOutlined, LockOutlined, QuestionCircleOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { backendRequest, setLoginInfo } from '../../utils/backend'
import TextArea from 'antd/es/input/TextArea'
import MDEditor from '@uiw/react-md-editor'

type AdminProps = {
    setUsername:Function
}

export const Admin:FC<AdminProps> = ({setUsername}) => {
    const username = useContext(LoginContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(username === null) navigate('/login')
      }, [])

    const [blogpostValue, setBlogpostValue] = useState<string>(`<h1>Blogtitel</h1>
    <p>Jegliches HTML-Markup wird unterstützt</p>
    <blockquote>Probier die verschiedenen Ansichten und Werkzeuge in der Toolbar aus!</blockquote>
    <h3>Bilder können über Links eingefügt werden</h3>
    <img src="https://images.saymedia-content.com/.image/t_share/MTk2NzY3MjA5ODc0MjY5ODI2/top-10-cutest-cat-photos-of-all-time.jpg"/>
        `)
    
    const [ownDescriptionToggle, setOwnDescriptionToggle] = useState<boolean>(true)
    const [ownTitleImageToggle, setOwnTitleImageToggle] = useState<boolean>(false)
    const [ownImageUrl, setOwnImageUrl] = useState<string>('')
    const [addAdminLoading, setAddAdminLoading] = useState<boolean>(false)
    const [postBlogLoading, setPostBlogLoading] = useState<boolean>(false)
    const [usernameLoading, setUsernameLoading] = useState<boolean>(false)
    const [usernameValue, setUsernameValue] = useState<string>(username ?? '')
    const [newUsernameValue, setNewUsernameValue] = useState<string>('')
    const setInfo = useContext(InfoContext)

    const confirmDeleteAccount = () => {
        console.log('confirm delete')
    }

    const cancelDeleteAccount = () => {
        console.log('cancel delete')
    }

    const onSendPassword = (values:any) => {
        console.log('password', values)
    }

    const onPostBlog = (values:any) => {
        console.log('blog', values)
    }

    const onAddUser = (values:any) => {
        console.log('user', values)
    }

    return (
        <>
            <main className='max-w-screen-md min-h-80 mx-auto' id='admin-panel'>
                <h1 className='text-2xl pt-7' style={{marginTop: '100px'}}>Admin Panel</h1>
                <Tabs
                    defaultActiveKey={localStorage.getItem('admin-panel-active-tab') ?? '1'}
                    className='pb-20'
                    onChange={(activeKey:string) => {
                        localStorage.setItem('admin-panel-active-tab', activeKey)
                    }}
                    items={[
                        {
                            key: '1',
                            label: `My account`,
                            children: <>
                                <Form
                                    initialValues={{ remember: true }}
                                    layout='vertical'
                                >
                                    <h2 className='mb-2'>Username</h2>
                                    <Form.Item>
                                        <Space direction='horizontal'>
                                            <Input
                                                count={{
                                                    show: true,
                                                    max: 6,
                                                    strategy: (txt) => txt.trim().length,
                                                    exceedFormatter: (txt, {max}) => txt.trim().slice(0, max),
                                                }}
                                                value={usernameValue}
                                                onChange={(e) => setUsernameValue(e.target?.value.trim().replaceAll(/[^a-zA-Z0-9_]/g, ''))}
                                                defaultValue={username ?? ''}
                                                prefix={<UserOutlined />}
                                                placeholder='username'
                                                status={usernameValue === '' ? 'error' : ''}
                                            />
                                            {username !== usernameValue && <>
                                                {usernameValue !== ''&& <Button
                                                    onClick={() => {
                                                        setUsernameLoading(true)

                                                        backendRequest('php/update_username.php', {new_username: usernameValue}).then((response) => {
                                                            setInfo('Username changed successfully!', 'success')
                                                       }).catch((reason) => {
                                                            setInfo(reason.text, reason.status)
                                                        }).finally(() => {
                                                            setUsernameLoading(false)
                                                            setUsername(usernameValue)
                                                        })
                                                    }}
                                                    loading={usernameLoading}
                                                >Save</Button>}
                                                <Button 
                                                    onClick={() => {
                                                        setUsernameValue(username ?? '')
                                                    }}
                                                    danger
                                                >Cancel</Button>
                                            </>}
                                        </Space>
                                        {usernameValue === '' && <div style={{color: '#ff4d4f'}}>Username already taken</div>}
                                    </Form.Item>
                                </Form>

                                <h2 className='mt-10'>Password</h2>
                                <Form
                                    initialValues={{ remember: true }}
                                    onFinish={onSendPassword}
                                    layout='vertical'
                                >
                                    <Space direction='vertical'>
                                        <Form.Item
                                            label="Old password"
                                            name="old-password"
                                            rules={[{ required: true, message: 'Please input your old password!' }]}
                                        >
                                            <Input.Password placeholder='password123' prefix={<LockOutlined />}/>
                                        </Form.Item>

                                        <Space direction='horizontal'>
                                            <Form.Item
                                                label="New password"
                                                name="new-password"
                                                rules={[{ required: true, message: 'Please input your new password!' }]}
                                            >
                                                <Input.Password placeholder='password123' prefix={<LockOutlined />}/>
                                            </Form.Item>
                                            <Form.Item
                                                label="Repeat new password"
                                                name="repeat-password"
                                                rules={[{ required: true, message: 'Please repeat your new password!' }]}
                                            >
                                                <Input.Password placeholder='password123' prefix={<LockOutlined />}/>
                                            </Form.Item>
                                        </Space>
                                        <Form.Item>
                                            <Button htmlType="submit" className='-mt-2'>
                                                Change
                                            </Button>
                                        </Form.Item>
                                    </Space>
                                </Form>
                                
                                <h2 className='mt-3'>Danger Zone</h2>
                                <div className='flex flex-wrap gap-5 mt-2'>
                                    <Button onClick={() => {setLoginInfo('', ''); location.reload()}}danger>Logout</Button>
                                    <Popconfirm
                                        title="Delete your account"
                                        description={<span>Are you sure you want to delete your account? <br /> This action is <b>irreversible</b></span>}
                                        onConfirm={confirmDeleteAccount}
                                        onCancel={cancelDeleteAccount}
                                        icon={<QuestionCircleOutlined />}
                                        okButtonProps={{danger: true}}
                                        okText="Yes"
                                        cancelText="Cancel"
                                    >
                                        <Button type='primary' danger>Delete Account</Button>
                                    </Popconfirm>
                                </div>
                            </>,
                            icon: <FormOutlined />
                        },
                        {
                            key: '2',
                            label: `Create Blogpost`,
                            children: <>
                                <Form
                                    initialValues={{remember: true}}
                                    onFinish={onPostBlog}
                                >
                                    <Form.Item>
                                        <MDEditor
                                            value={blogpostValue}
                                            onChange={(value) => setBlogpostValue(value  ?? '')}
                                            height='30em'
                                        />
                                    </Form.Item>
                                    <Form.Item name='use-own-description'>
                                        <Space direction='horizontal'>
                                            <span className='light-font'>Eigene Kurzbeschreibung definieren</span>
                                            <Switch
                                                checkedChildren={<CheckOutlined />}
                                                unCheckedChildren={<CloseOutlined />}
                                                value={ownDescriptionToggle}
                                                onChange={setOwnDescriptionToggle}
                                                defaultChecked
                                            />
                                        </Space>
                                    </Form.Item>
                                    {ownDescriptionToggle &&
                                        <Form.Item name='own-description'>
                                            <TextArea
                                                showCount
                                                maxLength={150}
                                                placeholder="Gib hier die Kurzbeschreibung ein, die in der Blog-Preview sichtbar sein wird."
                                                autoSize={{ minRows: 2, maxRows: 6 }}
                                            />
                                        </Form.Item>
                                    }
                                    <Form.Item name='use-own-image'>
                                        <Space direction='horizontal'>
                                            <span className='light-font'>Eigenes Titelbild wählen (URL)</span>
                                            <Switch
                                                checkedChildren={<CheckOutlined />}
                                                unCheckedChildren={<CloseOutlined />}
                                                value={ownTitleImageToggle}
                                                onChange={setOwnTitleImageToggle}
                                                defaultChecked
                                            />
                                        </Space>
                                    </Form.Item>
                                    {ownTitleImageToggle && <>
                                        <Form.Item name='own-image-url'>
                                            <Input 
                                                value={ownImageUrl}
                                                onChange={(e) => setOwnImageUrl(e.target?.value)}
                                                placeholder='https://www.meinbild.at'
                                                suffix={
                                                    <Tooltip title="Nutze für eigene Bilder einen Image-Hosting Service wie https://imgbb.com/ oder nimm einfach Bilder unter öffentlicher Lizenz">
                                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                                    </Tooltip>
                                                }
                                            />
                                        </Form.Item>
                                        <img src={ownImageUrl} className='w-1/2 rounded-xl' alt="Bild nicht gefunden"/>
                                    </>}
                                    <Form.Item>
                                        <Button className='mt-10' htmlType='submit' loading={postBlogLoading}>Blog posten</Button>
                                    </Form.Item>
                                </Form>
                            </>,
                            icon: <FileAddOutlined />,
                        },
                        {
                            key: '3',
                            label: `Add admin`,
                            children: <>
                                <Form
                                    initialValues={{ remember: true }}
                                    onFinish={onAddUser}
                                    layout='vertical'
                                >
                                <Space direction='vertical'>
                                    <Form.Item
                                        label="Username"
                                        name="username"
                                        rules={[{ required: true, message: 'Please input the username!' }]}
                                        hasFeedback
                                        validateStatus="warning"
                                        help="The information is being validated..."
                                    >
                                        <Input
                                            count={{
                                                show: true,
                                                max: 6,
                                                strategy: (txt) => txt.trim().length,
                                                exceedFormatter: (txt, {max}) => txt.trim().slice(0, max),
                                            }}
                                            value={newUsernameValue}
                                            onChange={(e) => setNewUsernameValue(e.target?.value.trim().replaceAll(/[^a-zA-Z0-9_]/g, ''))}
                                            prefix={<UserOutlined />}
                                            placeholder='username'
                                        />
                                    </Form.Item>

                                    <Space direction='horizontal'>
                                        <Form.Item
                                            label="Password"
                                            name="new-password"
                                            rules={[{ required: true, message: 'Please input a password!' }]}
                                        >
                                            <Input.Password placeholder='password123' prefix={<LockOutlined />}/>
                                        </Form.Item>
                                        <Form.Item
                                            label="Repeat password"
                                            name="repeat-password"
                                            rules={[{ required: true, message: 'Please repeat the password!' }]}
                                        >
                                            <Input.Password placeholder='password123' prefix={<LockOutlined />}/>
                                        </Form.Item>
                                    </Space>

                                    <Form.Item>
                                    <Button htmlType="submit" loading={addAdminLoading}>
                                        Add admin
                                    </Button>
                                    </Form.Item>
                                </Space>
                                </Form>
                            </>,
                            icon: <UserAddOutlined />,
                        },
                    ]}
                />
            </main>
        </>
    )
}
