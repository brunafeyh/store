import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import './ErrorPage.scss'

type Props = {
	code: number
	title: string
}

const ErrorPage: FC<Props> = ({ code, title }) => {
	const navigate = useNavigate()

	return (
		<div className="error-page">
			<div className="error-content">
				<h1 className="error-code">{code}</h1>
				<h2 className="error-title">{title}</h2>
				<p className="error-description">
					Você está tentando acessar uma página ou recurso que não existe ou que você não tem acesso!
				</p>
				<button className="back-button" onClick={() => navigate('/')}>
					<span className="icon">↩</span> Voltar à Página Inicial
				</button>
			</div>
		</div>
	)
}

export default ErrorPage
