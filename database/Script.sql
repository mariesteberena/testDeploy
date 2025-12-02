USE [cuidar]
GO
/****** Object:  Table [dbo].[Cuidador]    Script Date: 2/12/2025 16:56:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cuidador](
	[IdCuidador] [int] IDENTITY(1,1) NOT NULL,
	[IdUsuario] [int] NOT NULL,
	[Telefono] [varchar](20) NULL,
	[Ubicacion] [varchar](255) NULL,
	[Descripcion] [varchar](1000) NULL,
	[TipoCuidado] [varchar](100) NULL,
	[TarifaPorHora] [decimal](10, 2) NULL,
	[AnosExperiencia] [int] NULL,
	[Calificacion] [decimal](3, 2) NULL,
	[Estado] [varchar](20) NOT NULL,
	[FechaCreacion] [datetime] NULL,
	[FechaActualizacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[IdCuidador] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Postulaciones]    Script Date: 2/12/2025 16:56:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Postulaciones](
	[IdPostulacion] [int] IDENTITY(1,1) NOT NULL,
	[IdCuidador] [int] NOT NULL,
	[IdFamilia] [int] NOT NULL,
	[Estado] [varchar](20) NOT NULL,
	[Mensaje] [varchar](500) NULL,
	[FechaAlta] [datetime] NULL,
	[IdSolicitud] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[IdPostulacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 2/12/2025 16:56:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[IdRol] [int] IDENTITY(1,1) NOT NULL,
	[NombreRol] [varchar](50) NOT NULL,
	[Descripcion] [varchar](255) NULL,
	[Estado] [varchar](10) NOT NULL,
	[FechaCreacion] [datetime] NULL,
	[FechaActualizacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[IdRol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 2/12/2025 16:56:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[IdUsuario] [int] IDENTITY(1,1) NOT NULL,
	[NombreUsuario] [varchar](100) NOT NULL,
	[Email] [varchar](255) NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[Apellido] [varchar](100) NOT NULL,
	[Contraseña] [varchar](255) NOT NULL,
	[IdRol] [int] NOT NULL,
	[Estado] [varchar](10) NOT NULL,
	[Imagen] [varchar](500) NULL,
	[FechaCreacion] [datetime] NULL,
	[FechaActualizacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[IdUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Cuidador] ON 
GO
INSERT [dbo].[Cuidador] ([IdCuidador], [IdUsuario], [Telefono], [Ubicacion], [Descripcion], [TipoCuidado], [TarifaPorHora], [AnosExperiencia], [Calificacion], [Estado], [FechaCreacion], [FechaActualizacion]) VALUES (2, 2, N'2284585892', N'Olavarria', N'no quiero', N'', CAST(5000.00 AS Decimal(10, 2)), 4, CAST(0.00 AS Decimal(3, 2)), N'activo', CAST(N'2025-12-02T15:23:38.533' AS DateTime), CAST(N'2025-12-02T15:27:48.723' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[Cuidador] OFF
GO
SET IDENTITY_INSERT [dbo].[Postulaciones] ON 
GO
INSERT [dbo].[Postulaciones] ([IdPostulacion], [IdCuidador], [IdFamilia], [Estado], [Mensaje], [FechaAlta], [IdSolicitud]) VALUES (10, 2, 3, N'pendiente', NULL, CAST(N'2025-12-02T15:56:40.590' AS DateTime), NULL)
GO
INSERT [dbo].[Postulaciones] ([IdPostulacion], [IdCuidador], [IdFamilia], [Estado], [Mensaje], [FechaAlta], [IdSolicitud]) VALUES (25, 2, 3, N'pendiente', NULL, CAST(N'2025-12-02T16:15:34.867' AS DateTime), 1)
GO
SET IDENTITY_INSERT [dbo].[Postulaciones] OFF
GO
SET IDENTITY_INSERT [dbo].[Roles] ON 
GO
INSERT [dbo].[Roles] ([IdRol], [NombreRol], [Descripcion], [Estado], [FechaCreacion], [FechaActualizacion]) VALUES (1, N'admin', N'Administrador del sistema con acceso completo', N'activo', CAST(N'2025-12-02T15:19:40.250' AS DateTime), CAST(N'2025-12-02T15:19:40.250' AS DateTime))
GO
INSERT [dbo].[Roles] ([IdRol], [NombreRol], [Descripcion], [Estado], [FechaCreacion], [FechaActualizacion]) VALUES (2, N'worker', N'Trabajador/Cuidador que presta servicios', N'activo', CAST(N'2025-12-02T15:19:40.283' AS DateTime), CAST(N'2025-12-02T15:19:40.283' AS DateTime))
GO
INSERT [dbo].[Roles] ([IdRol], [NombreRol], [Descripcion], [Estado], [FechaCreacion], [FechaActualizacion]) VALUES (3, N'family', N'Familia que requiere servicios de cuidado', N'activo', CAST(N'2025-12-02T15:19:40.300' AS DateTime), CAST(N'2025-12-02T15:19:40.300' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[Roles] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuarios] ON 
GO
INSERT [dbo].[Usuarios] ([IdUsuario], [NombreUsuario], [Email], [Nombre], [Apellido], [Contraseña], [IdRol], [Estado], [Imagen], [FechaCreacion], [FechaActualizacion]) VALUES (1, N'admin', N'admin@cuidar.com', N'Administrador', N'Sistema', N'admin123', 1, N'activo', N'/images/Admin.png', CAST(N'2025-12-02T15:19:40.337' AS DateTime), CAST(N'2025-12-02T15:19:40.337' AS DateTime))
GO
INSERT [dbo].[Usuarios] ([IdUsuario], [NombreUsuario], [Email], [Nombre], [Apellido], [Contraseña], [IdRol], [Estado], [Imagen], [FechaCreacion], [FechaActualizacion]) VALUES (2, N'cuidador1', N'maria@cuidar.com', N'María', N'González', N'$2a$10$PQsUJAnaXf2621XNlqH9WOeKqExfksOw9pi3jjHKzrecaMsdIoOwG', 2, N'activo', N'/images/Trabajador.jpg', CAST(N'2025-12-02T15:19:40.357' AS DateTime), CAST(N'2025-12-02T15:20:43.650' AS DateTime))
GO
INSERT [dbo].[Usuarios] ([IdUsuario], [NombreUsuario], [Email], [Nombre], [Apellido], [Contraseña], [IdRol], [Estado], [Imagen], [FechaCreacion], [FechaActualizacion]) VALUES (3, N'cuidador2', N'ana@cuidar.com', N'Ana', N'López', N'cuidador456', 2, N'inactivo', N'/images/Trabajadora1.avif', CAST(N'2025-12-02T15:19:40.370' AS DateTime), CAST(N'2025-12-02T15:19:40.370' AS DateTime))
GO
INSERT [dbo].[Usuarios] ([IdUsuario], [NombreUsuario], [Email], [Nombre], [Apellido], [Contraseña], [IdRol], [Estado], [Imagen], [FechaCreacion], [FechaActualizacion]) VALUES (4, N'familia1', N'carlos@cuidar.com', N'Carlos', N'Rodríguez', N'familia123', 3, N'activo', N'/images/Familia.jpg', CAST(N'2025-12-02T15:19:40.383' AS DateTime), CAST(N'2025-12-02T15:19:40.383' AS DateTime))
GO
INSERT [dbo].[Usuarios] ([IdUsuario], [NombreUsuario], [Email], [Nombre], [Apellido], [Contraseña], [IdRol], [Estado], [Imagen], [FechaCreacion], [FechaActualizacion]) VALUES (5, N'familia3', N'roberto@cuidar.com', N'Roberto', N'Pérez', N'familia789', 3, N'inactivo', N'/images/familia2.jpg', CAST(N'2025-12-02T15:19:40.397' AS DateTime), CAST(N'2025-12-02T15:19:40.397' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[Usuarios] OFF
GO
/****** Object:  Index [UQ__Cuidador__5B65BF96105EFB48]    Script Date: 2/12/2025 16:57:00 ******/
ALTER TABLE [dbo].[Cuidador] ADD UNIQUE NONCLUSTERED 
(
	[IdUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Roles__4F0B537FED54EF7B]    Script Date: 2/12/2025 16:57:00 ******/
ALTER TABLE [dbo].[Roles] ADD UNIQUE NONCLUSTERED 
(
	[NombreRol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Usuarios__6B0F5AE02352C0E3]    Script Date: 2/12/2025 16:57:00 ******/
ALTER TABLE [dbo].[Usuarios] ADD UNIQUE NONCLUSTERED 
(
	[NombreUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Usuarios__A9D10534758A4988]    Script Date: 2/12/2025 16:57:00 ******/
ALTER TABLE [dbo].[Usuarios] ADD UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Cuidador] ADD  DEFAULT ((0)) FOR [TarifaPorHora]
GO
ALTER TABLE [dbo].[Cuidador] ADD  DEFAULT ((0)) FOR [AnosExperiencia]
GO
ALTER TABLE [dbo].[Cuidador] ADD  DEFAULT ((0)) FOR [Calificacion]
GO
ALTER TABLE [dbo].[Cuidador] ADD  DEFAULT ('activo') FOR [Estado]
GO
ALTER TABLE [dbo].[Cuidador] ADD  DEFAULT (getdate()) FOR [FechaCreacion]
GO
ALTER TABLE [dbo].[Cuidador] ADD  DEFAULT (getdate()) FOR [FechaActualizacion]
GO
ALTER TABLE [dbo].[Postulaciones] ADD  DEFAULT ('pendiente') FOR [Estado]
GO
ALTER TABLE [dbo].[Postulaciones] ADD  DEFAULT (getdate()) FOR [FechaAlta]
GO
ALTER TABLE [dbo].[Roles] ADD  DEFAULT ('activo') FOR [Estado]
GO
ALTER TABLE [dbo].[Roles] ADD  DEFAULT (getdate()) FOR [FechaCreacion]
GO
ALTER TABLE [dbo].[Roles] ADD  DEFAULT (getdate()) FOR [FechaActualizacion]
GO
ALTER TABLE [dbo].[Usuarios] ADD  DEFAULT ('activo') FOR [Estado]
GO
ALTER TABLE [dbo].[Usuarios] ADD  DEFAULT (getdate()) FOR [FechaCreacion]
GO
ALTER TABLE [dbo].[Usuarios] ADD  DEFAULT (getdate()) FOR [FechaActualizacion]
GO
ALTER TABLE [dbo].[Cuidador]  WITH CHECK ADD FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuarios] ([IdUsuario])
GO
ALTER TABLE [dbo].[Postulaciones]  WITH CHECK ADD FOREIGN KEY([IdCuidador])
REFERENCES [dbo].[Cuidador] ([IdCuidador])
GO
ALTER TABLE [dbo].[Postulaciones]  WITH CHECK ADD FOREIGN KEY([IdFamilia])
REFERENCES [dbo].[Usuarios] ([IdUsuario])
GO
ALTER TABLE [dbo].[Usuarios]  WITH CHECK ADD FOREIGN KEY([IdRol])
REFERENCES [dbo].[Roles] ([IdRol])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[Cuidador]  WITH CHECK ADD CHECK  (([Calificacion]>=(0) AND [Calificacion]<=(5)))
GO
ALTER TABLE [dbo].[Cuidador]  WITH CHECK ADD CHECK  (([Estado]='inactivo' OR [Estado]='activo'))
GO
ALTER TABLE [dbo].[Postulaciones]  WITH CHECK ADD CHECK  (([Estado]='cancelada' OR [Estado]='rechazada' OR [Estado]='aceptada' OR [Estado]='pendiente'))
GO
ALTER TABLE [dbo].[Roles]  WITH CHECK ADD CHECK  (([Estado]='inactivo' OR [Estado]='activo'))
GO
ALTER TABLE [dbo].[Usuarios]  WITH CHECK ADD CHECK  (([Estado]='inactivo' OR [Estado]='activo'))
GO
