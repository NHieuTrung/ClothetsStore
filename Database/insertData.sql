USE [ClothetsStore]
GO
INSERT [dbo].[Role] ([RoleId], [Name]) VALUES (N'e1bdf26e-230c-42fe-bc87-084fb7753835', N'Khách hàng')
INSERT [dbo].[Role] ([RoleId], [Name]) VALUES (N'c0dc2772-60bf-4314-b177-2a497943e35d', N'Quản trị viên')
INSERT [dbo].[Role] ([RoleId], [Name]) VALUES (N'ea9d56bd-a06c-4ebb-ad2d-f2af86824289', N'Nhân viên bán hàng')
INSERT [dbo].[Account] ([AccountId], [Username], [Password], [RoleId], [StatusId]) VALUES (N'5bfe13bc-d8f6-4f61-bad9-0a508a0f5cbb', N'employee03', N'8D969EEF6ECAD3C29A3A629280E686CF0C3F5D5A86AFF3CA12020C923ADC6C92', N'ea9d56bd-a06c-4ebb-ad2d-f2af86824289', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Account] ([AccountId], [Username], [Password], [RoleId], [StatusId]) VALUES (N'2a216ab2-93f4-4b27-9d47-5d7e217fe0bb', N'nghieutrung', N'8D969EEF6ECAD3C29A3A629280E686CF0C3F5D5A86AFF3CA12020C923ADC6C92', N'c0dc2772-60bf-4314-b177-2a497943e35d', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Account] ([AccountId], [Username], [Password], [RoleId], [StatusId]) VALUES (N'34a1142b-dee0-4061-b2cd-899e2a67a96e', N'employee02', N'8D969EEF6ECAD3C29A3A629280E686CF0C3F5D5A86AFF3CA12020C923ADC6C92', N'ea9d56bd-a06c-4ebb-ad2d-f2af86824289', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Account] ([AccountId], [Username], [Password], [RoleId], [StatusId]) VALUES (N'4fe9908a-20aa-41b8-abd7-9bcbdd7572b0', N'trgiathinh', N'8D969EEF6ECAD3C29A3A629280E686CF0C3F5D5A86AFF3CA12020C923ADC6C92', N'c0dc2772-60bf-4314-b177-2a497943e35d', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Account] ([AccountId], [Username], [Password], [RoleId], [StatusId]) VALUES (N'dc8cdad0-d31a-45a2-8c19-9f9e76d35baa', N'customer03', N'8D969EEF6ECAD3C29A3A629280E686CF0C3F5D5A86AFF3CA12020C923ADC6C92', N'e1bdf26e-230c-42fe-bc87-084fb7753835', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Account] ([AccountId], [Username], [Password], [RoleId], [StatusId]) VALUES (N'a7f8cb19-b6e8-4881-b343-a025d9f0bb52', N'customer02', N'8D969EEF6ECAD3C29A3A629280E686CF0C3F5D5A86AFF3CA12020C923ADC6C92', N'e1bdf26e-230c-42fe-bc87-084fb7753835', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Account] ([AccountId], [Username], [Password], [RoleId], [StatusId]) VALUES (N'f7089713-3ca9-4045-96ff-afd0cd3ec9eb', N'customer01', N'8D969EEF6ECAD3C29A3A629280E686CF0C3F5D5A86AFF3CA12020C923ADC6C92', N'e1bdf26e-230c-42fe-bc87-084fb7753835', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Account] ([AccountId], [Username], [Password], [RoleId], [StatusId]) VALUES (N'06c20ec9-185d-4941-a7ed-de967234002c', N'ngthinho', N'8D969EEF6ECAD3C29A3A629280E686CF0C3F5D5A86AFF3CA12020C923ADC6C92', N'c0dc2772-60bf-4314-b177-2a497943e35d', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Account] ([AccountId], [Username], [Password], [RoleId], [StatusId]) VALUES (N'ecef4ee1-7293-4212-8c15-e01dc309e13d', N'pvhieutrung', N'8D969EEF6ECAD3C29A3A629280E686CF0C3F5D5A86AFF3CA12020C923ADC6C92', N'c0dc2772-60bf-4314-b177-2a497943e35d', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Account] ([AccountId], [Username], [Password], [RoleId], [StatusId]) VALUES (N'8f2ce585-4e6a-43b9-93c3-e70293e7ea7a', N'employee01', N'8D969EEF6ECAD3C29A3A629280E686CF0C3F5D5A86AFF3CA12020C923ADC6C92', N'ea9d56bd-a06c-4ebb-ad2d-f2af86824289', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Gender] ([GenderId], [Name]) VALUES (N'45e3cc14-e862-459f-ab58-09fd3ffea244', N'Nam')
INSERT [dbo].[Gender] ([GenderId], [Name]) VALUES (N'b76a04a5-1eb2-4c0c-94ed-4b029d4804e6', N'Khác')
INSERT [dbo].[Gender] ([GenderId], [Name]) VALUES (N'18a24daa-7dd7-4d70-b7cc-d4d76df56911', N'Nữ')
INSERT [dbo].[Customer] ([CustomerId], [Name], [Phone], [GenderId], [Address], [Birthday], [Email], [AccountId]) VALUES (N'49b36127-7e70-422a-93bf-55c15fbefc6d', N'Anh Vũ', N'0934625795', N'45e3cc14-e862-459f-ab58-09fd3ffea244', N'440 Tr?n Van Ðang P10 Q3', CAST(N'1997-09-14' AS Date), N'customer01@gmail.com', N'f7089713-3ca9-4045-96ff-afd0cd3ec9eb')
INSERT [dbo].[Customer] ([CustomerId], [Name], [Phone], [GenderId], [Address], [Birthday], [Email], [AccountId]) VALUES (N'6541b576-f983-47bb-b387-983d909720cd', N'Minh Bảo', N'0934851362', N'45e3cc14-e862-459f-ab58-09fd3ffea244', N'482 H?ng Bàng P6 Q6', CAST(N'1999-12-25' AS Date), N'customer03@gmail.com', N'dc8cdad0-d31a-45a2-8c19-9f9e76d35baa')
INSERT [dbo].[Customer] ([CustomerId], [Name], [Phone], [GenderId], [Address], [Birthday], [Email], [AccountId]) VALUES (N'2d2d8d8b-3987-441a-81f5-d037d79ca0b6', N'Anh Dũng', N'0931652346', N'45e3cc14-e862-459f-ab58-09fd3ffea244', N'289 Lãnh Binh Thang P8 Q11', CAST(N'1998-03-26' AS Date), N'customer02@gmail.com', N'a7f8cb19-b6e8-4881-b343-a025d9f0bb52')
INSERT [dbo].[Status] ([StatusId], [Name]) VALUES (N'1c55f3c2-d7ed-4b82-8f18-480062d092a1', N'Khoá')
INSERT [dbo].[Status] ([StatusId], [Name]) VALUES (N'4d4e88d6-3d88-4171-8ba9-6e5c1b101881', N'Sắp về hàng')
INSERT [dbo].[Status] ([StatusId], [Name]) VALUES (N'87577063-322e-4901-98d2-ff519341d992', N'Hoạt động')
INSERT [dbo].[Employee] ([EmployeeId], [Name], [Phone], [GenderId], [BIrthday], [Address], [Email], [StatusId], [AccountId]) VALUES (N'0ef7bf7d-a37e-41ec-87d2-0254c3ae69e6', N'Hiếu Trung', N'0938952641', N'45e3cc14-e862-459f-ab58-09fd3ffea244', CAST(N'1997-07-27' AS Date), N'209 Trần Phú P4 Q5', N'trungnguyen.1997270710@gmail.com', N'87577063-322e-4901-98d2-ff519341d992', N'2a216ab2-93f4-4b27-9d47-5d7e217fe0bb')
INSERT [dbo].[Employee] ([EmployeeId], [Name], [Phone], [GenderId], [BIrthday], [Address], [Email], [StatusId], [AccountId]) VALUES (N'c94ddb7e-d3af-4525-922b-2371544c31ba', N'Thị Nho', N'0862543658', N'18a24daa-7dd7-4d70-b7cc-d4d76df56911', CAST(N'1997-09-15' AS Date), N'S322B Quốc lộ 62 P6', N'tnngo.97@gmail.com', N'87577063-322e-4901-98d2-ff519341d992', N'06c20ec9-185d-4941-a7ed-de967234002c')
INSERT [dbo].[Employee] ([EmployeeId], [Name], [Phone], [GenderId], [BIrthday], [Address], [Email], [StatusId], [AccountId]) VALUES (N'6785e776-27f0-4293-89fe-68c2f9cd41f4', N'Hiếu Trung', N'0862354169', N'45e3cc14-e862-459f-ab58-09fd3ffea244', CAST(N'1997-01-03' AS Date), N'92A Tán Kế P3', N'hieu.trung.030197@gmail.com', N'87577063-322e-4901-98d2-ff519341d992', N'ecef4ee1-7293-4212-8c15-e01dc309e13d')
INSERT [dbo].[Employee] ([EmployeeId], [Name], [Phone], [GenderId], [BIrthday], [Address], [Email], [StatusId], [AccountId]) VALUES (N'19218bb8-cd08-40f5-8876-98e938d3434d', N'Anh Tuấn', N'0975326485', N'45e3cc14-e862-459f-ab58-09fd3ffea244', CAST(N'1998-07-06' AS Date), N'49 Cách Mạng Tháng Tám P3', N'customer01@gmail.com', N'87577063-322e-4901-98d2-ff519341d992', N'8f2ce585-4e6a-43b9-93c3-e70293e7ea7a')
INSERT [dbo].[Employee] ([EmployeeId], [Name], [Phone], [GenderId], [BIrthday], [Address], [Email], [StatusId], [AccountId]) VALUES (N'2c4c9c60-8dde-455e-b3b5-a26c57db5ea8', N'Hà Anh', N'0974532648', N'18a24daa-7dd7-4d70-b7cc-d4d76df56911', CAST(N'1998-11-24' AS Date), N'236 Phó Cơ Điều P6 Q11', N'customer03@gmail.com', N'87577063-322e-4901-98d2-ff519341d992', N'5bfe13bc-d8f6-4f61-bad9-0a508a0f5cbb')
INSERT [dbo].[Employee] ([EmployeeId], [Name], [Phone], [GenderId], [BIrthday], [Address], [Email], [StatusId], [AccountId]) VALUES (N'72de2be0-e1bb-4f73-89fe-b8369369a0ba', N'Kiến Vinh', N'0973462158', N'45e3cc14-e862-459f-ab58-09fd3ffea244', CAST(N'1998-09-12' AS Date), N'440 Trần Văn Đang P10 Q3', N'customer02@gmail.com', N'87577063-322e-4901-98d2-ff519341d992', N'34a1142b-dee0-4061-b2cd-899e2a67a96e')
INSERT [dbo].[Employee] ([EmployeeId], [Name], [Phone], [GenderId], [BIrthday], [Address], [Email], [StatusId], [AccountId]) VALUES (N'7834fade-e963-452e-9dd6-d9a363e4b900', N'Gia Thịnh', N'0938426513', N'45e3cc14-e862-459f-ab58-09fd3ffea244', CAST(N'1997-06-19' AS Date), N'386 Lê Hồng Phong P1 Q10', N'trangiathinh@gmail.com', N'87577063-322e-4901-98d2-ff519341d992', N'4fe9908a-20aa-41b8-abd7-9bcbdd7572b0')
INSERT [dbo].[Brand] ([BrandId], [Name], [CompanyName]) VALUES (N'f9e94bea-0d59-4b1e-9220-1c70c25fddec', N'Levi''s', N'LEVI STRAUSS')
INSERT [dbo].[TypeProduct] ([TypeProductId], [Name], [StatusId]) VALUES (N'fdd3818f-c444-45a8-b075-0e8aaf7d2ddc', N'Áo sơ mi', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[TypeProduct] ([TypeProductId], [Name], [StatusId]) VALUES (N'23097cb6-dad1-48b5-9fbd-3241336bd35d', N'Quần kaki', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[TypeProduct] ([TypeProductId], [Name], [StatusId]) VALUES (N'dae61bc6-d823-4fa3-b20d-4628bc34720a', N'Áo thun', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[TypeProduct] ([TypeProductId], [Name], [StatusId]) VALUES (N'00be2701-2085-4c4d-b2b5-e208cf40e8d8', N'Quần jean', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Product] ([ProductId], [Code], [Name], [TypeProductId], [Price], [Detail], [Discount], [CreatedDate], [BrandId], [StatusId]) VALUES (N'21fdcb92-1482-486e-ba71-1079d7c038bd', N'Style # 045110925', N'511™ Slim Fit Twill Men''s Jeans', N'00be2701-2085-4c4d-b2b5-e208cf40e8d8', CAST(1250000 AS Decimal(18, 0)), N'A modern slim with room to move, the 511™ Slim Fit Stretch Jeans are a classic since right now. These jeans sit below the waist with a slim fit from hip to ankle. This pair has just the right amount of stretch for all-day comfort. Cut close to the body, the 511™ Slim is a great alternative to the skinny jean--you''ll get the same lean look with added comfort. The narrow leg also means endless style options. For a laid-back daytime look, try a slightly scrunched leg and sneakers. Once night rolls around, try a 2-inch cuff with a Chelsea boot.', NULL, CAST(N'2019-10-01T00:00:00.000' AS DateTime), N'f9e94bea-0d59-4b1e-9220-1c70c25fddec', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Product] ([ProductId], [Code], [Name], [TypeProductId], [Price], [Detail], [Discount], [CreatedDate], [BrandId], [StatusId]) VALUES (N'bc08531e-0178-4fee-9ef1-6499d97a402e', N'Style # 798300018', N'501® ''93 Straight Men''s Jeans', N'00be2701-2085-4c4d-b2b5-e208cf40e8d8', CAST(1900000 AS Decimal(18, 0)), N'99% Cotton, 1% Elastane
Button fly
5-pocket
Wash and dry inside out with like colors; liquid detergent is recommended
Imported', NULL, CAST(N'2019-10-01T00:00:00.000' AS DateTime), N'f9e94bea-0d59-4b1e-9220-1c70c25fddec', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Product] ([ProductId], [Code], [Name], [TypeProductId], [Price], [Detail], [Discount], [CreatedDate], [BrandId], [StatusId]) VALUES (N'9d4eab2c-45e8-4faa-8b86-6a9ec14c7afa', N'Style # 045112091', N'511™ Slim Fit Advanced Stretch Men''s Jeans', N'00be2701-2085-4c4d-b2b5-e208cf40e8d8', CAST(1200000 AS Decimal(18, 0)), N'A modern slim with room to move.', NULL, CAST(N'2019-10-01T00:00:00.000' AS DateTime), N'f9e94bea-0d59-4b1e-9220-1c70c25fddec', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Product] ([ProductId], [Code], [Name], [TypeProductId], [Price], [Detail], [Discount], [CreatedDate], [BrandId], [StatusId]) VALUES (N'00ec72f9-5203-40ae-9e10-7cfbb761e848', N'Style # 045111907', N'511™ Slim Fit Advanced Stretch Men''s Jeans', N'00be2701-2085-4c4d-b2b5-e208cf40e8d8', CAST(1150000 AS Decimal(18, 0)), N'A modern slim with room to move
Added stretch for all-day comfort
Lean look with added comfort
A great alternative to skinny jeans
Our new and improved take on 511™ Slim Jeans in black stretch denim', NULL, CAST(N'2019-10-01T00:00:00.000' AS DateTime), N'f9e94bea-0d59-4b1e-9220-1c70c25fddec', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Product] ([ProductId], [Code], [Name], [TypeProductId], [Price], [Detail], [Discount], [CreatedDate], [BrandId], [StatusId]) VALUES (N'7c1e4ae5-6ef9-495d-b7e7-ac1ba061dafd', N'Style # 288330301', N'512™ Slim Taper Fit Advanced Stretch Men''s Jeans', N'00be2701-2085-4c4d-b2b5-e208cf40e8d8', CAST(1300000 AS Decimal(18, 0)), N'Slimmer leg than Levi''s® 511™
Tailor-inspired cut
Right amount of stretch for all-day comfort
Made with our sustainable Water<Less™ techniques', NULL, CAST(N'2019-10-01T00:00:00.000' AS DateTime), N'f9e94bea-0d59-4b1e-9220-1c70c25fddec', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Product] ([ProductId], [Code], [Name], [TypeProductId], [Price], [Detail], [Discount], [CreatedDate], [BrandId], [StatusId]) VALUES (N'561d117e-8495-492d-8c95-ec3b6365bbb4', N'Style # 005504834', N'550™ Relaxed Fit Men''s Jeans', N'00be2701-2085-4c4d-b2b5-e208cf40e8d8', CAST(1200000 AS Decimal(18, 0)), N'In 1985, Levi''s® introduced the 550™ Relaxed Jean. It had the same quality and craftsmanship as the 501® Original, but with more room in the seat and thigh. Today, it''s the comfortable classic for guys who want a relaxed look.', NULL, CAST(N'2019-10-01T00:00:00.000' AS DateTime), N'f9e94bea-0d59-4b1e-9220-1c70c25fddec', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Product] ([ProductId], [Code], [Name], [TypeProductId], [Price], [Detail], [Discount], [CreatedDate], [BrandId], [StatusId]) VALUES (N'9b8c4e80-b5ef-4cb2-80c9-f33bba4c681f', N'Style # 055100862', N'510™ Skinny Fit Advanced Stretch Men''s Jeans', N'00be2701-2085-4c4d-b2b5-e208cf40e8d8', CAST(1450000 AS Decimal(18, 0)), N'The ultimate skinny fit for men
Contemporary style
Made with our sustainable Water<Less™ techniques', NULL, CAST(N'2019-10-01T00:00:00.000' AS DateTime), N'f9e94bea-0d59-4b1e-9220-1c70c25fddec', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Color] ([ColorId], [ColorValue], [Name], [StatusId]) VALUES (N'2d73b801-4b30-4dea-bcc4-0ac0b41b7de7', N'#ffffff', N'Trắng', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Color] ([ColorId], [ColorValue], [Name], [StatusId]) VALUES (N'08dd28a6-51d3-4ccb-bb07-1a131d1c2752', N'#000000', N'Đen', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Color] ([ColorId], [ColorValue], [Name], [StatusId]) VALUES (N'46e857f0-a3a4-4fd0-9818-1abde2ffde26', N'#008000', N'Xanh lá', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Color] ([ColorId], [ColorValue], [Name], [StatusId]) VALUES (N'8cc670fa-ab25-4d74-a662-56a53a636977', N'#939CA8', N'#939CA8', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Color] ([ColorId], [ColorValue], [Name], [StatusId]) VALUES (N'ad2e5afc-d266-420b-bbbe-6cff3e5c8ce3', N'#94A8B2', N'#94A8B2', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Color] ([ColorId], [ColorValue], [Name], [StatusId]) VALUES (N'21425f79-b224-463e-b9b6-8bba8754df4c', N'#ff0000', N'Đỏ', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Color] ([ColorId], [ColorValue], [Name], [StatusId]) VALUES (N'f0cd241e-358a-4a7d-b549-a54066481df3', N'#0000ff', N'Xanh dương', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Color] ([ColorId], [ColorValue], [Name], [StatusId]) VALUES (N'ba85c866-a55c-40ae-8443-bde0326e2039', N'#ffc0cb', N'Hồng', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Color] ([ColorId], [ColorValue], [Name], [StatusId]) VALUES (N'bed9504c-dc4b-4c81-8f17-e1a77a42cc35', N'#ffff00', N'Tím', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Color] ([ColorId], [ColorValue], [Name], [StatusId]) VALUES (N'f13c60d1-6d9c-418a-9c2b-f02d5515d990', N'#C4B7A6', N'Be', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Color] ([ColorId], [ColorValue], [Name], [StatusId]) VALUES (N'a54fafaf-f23e-4cf5-b9a3-ff1897c6de12', N'#AAB1BC', N'#AAB1BC', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[ProductColor] ([ProductId], [ColorId], [ImageUrl], [StatusId]) VALUES (N'21fdcb92-1482-486e-ba71-1079d7c038bd', N'f13c60d1-6d9c-418a-9c2b-f02d5515d990', N'product\21FDCB92-1482-486E-BA71-1079D7C038BD\f13c60d1-6d9c-418a-9c2b-f02d5515d990.jpg', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[ProductColor] ([ProductId], [ColorId], [ImageUrl], [StatusId]) VALUES (N'bc08531e-0178-4fee-9ef1-6499d97a402e', N'a54fafaf-f23e-4cf5-b9a3-ff1897c6de12', N'product\BC08531E-0178-4FEE-9EF1-6499D97A402E\a54fafaf-f23e-4cf5-b9a3-ff1897c6de12.jpg', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[ProductColor] ([ProductId], [ColorId], [ImageUrl], [StatusId]) VALUES (N'9d4eab2c-45e8-4faa-8b86-6a9ec14c7afa', N'08dd28a6-51d3-4ccb-bb07-1a131d1c2752', N'product\9D4EAB2C-45E8-4FAA-8B86-6A9EC14C7AFA', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[ProductColor] ([ProductId], [ColorId], [ImageUrl], [StatusId]) VALUES (N'00ec72f9-5203-40ae-9e10-7cfbb761e848', N'08dd28a6-51d3-4ccb-bb07-1a131d1c2752', N'product\00EC72F9-5203-40AE-9E10-7CFBB761E848', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[ProductColor] ([ProductId], [ColorId], [ImageUrl], [StatusId]) VALUES (N'7c1e4ae5-6ef9-495d-b7e7-ac1ba061dafd', N'ad2e5afc-d266-420b-bbbe-6cff3e5c8ce3', N'product\7C1E4AE5-6EF9-495D-B7E7-AC1BA061DAFD', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[ProductColor] ([ProductId], [ColorId], [ImageUrl], [StatusId]) VALUES (N'561d117e-8495-492d-8c95-ec3b6365bbb4', N'8cc670fa-ab25-4d74-a662-56a53a636977', N'product\561D117E-8495-492D-8C95-EC3B6365BBB4', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[ProductColor] ([ProductId], [ColorId], [ImageUrl], [StatusId]) VALUES (N'9b8c4e80-b5ef-4cb2-80c9-f33bba4c681f', N'08dd28a6-51d3-4ccb-bb07-1a131d1c2752', N'product\9B8C4E80-B5EF-4CB2-80C9-F33BBA4C681F', N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Size] ([SizeId], [Name], [TypeProductId], [StatusId]) VALUES (N'abed9d1d-3427-4a1e-b73a-3e42cb632768', N'34', NULL, N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Size] ([SizeId], [Name], [TypeProductId], [StatusId]) VALUES (N'1ef2c0f8-b38d-42c0-9e5d-6a70f0313a07', N'L', NULL, N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Size] ([SizeId], [Name], [TypeProductId], [StatusId]) VALUES (N'f31ac2c9-a8f6-4eaa-90a7-83d4cdf0b581', N'29', NULL, N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Size] ([SizeId], [Name], [TypeProductId], [StatusId]) VALUES (N'72de309c-043f-4054-b908-b777a22533d8', N'XL', NULL, N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Size] ([SizeId], [Name], [TypeProductId], [StatusId]) VALUES (N'ec659074-ea1f-41a3-8eb7-c1e85301ede2', N'31', NULL, N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Size] ([SizeId], [Name], [TypeProductId], [StatusId]) VALUES (N'db9e59fd-a263-41e6-9452-c3834fb77cb0', N'M', NULL, N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Size] ([SizeId], [Name], [TypeProductId], [StatusId]) VALUES (N'2182c59d-bcea-41a1-bd5c-c6eadaec4e5e', N'XS', NULL, N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Size] ([SizeId], [Name], [TypeProductId], [StatusId]) VALUES (N'8be31c52-054d-42ea-a3aa-c791744b6a6e', N'32', NULL, N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Size] ([SizeId], [Name], [TypeProductId], [StatusId]) VALUES (N'7c65a3c3-cfe4-48cf-86be-d2f9a845a407', N'S', NULL, N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Size] ([SizeId], [Name], [TypeProductId], [StatusId]) VALUES (N'28e4c982-2d60-471d-9307-d517fac37802', N'XXL', NULL, N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Size] ([SizeId], [Name], [TypeProductId], [StatusId]) VALUES (N'b484db7a-a67c-4e23-99bb-da6705e6af28', N'30', NULL, N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[Size] ([SizeId], [Name], [TypeProductId], [StatusId]) VALUES (N'50ed75f6-2737-4c88-94e3-e87c44c47bd5', N'33', NULL, N'87577063-322e-4901-98d2-ff519341d992')
INSERT [dbo].[ProductSize] ([SizeId], [ProductId], [ColorId], [InventoryQuantity]) VALUES (N'f31ac2c9-a8f6-4eaa-90a7-83d4cdf0b581', N'21fdcb92-1482-486e-ba71-1079d7c038bd', N'f13c60d1-6d9c-418a-9c2b-f02d5515d990', 15)
INSERT [dbo].[ProductSize] ([SizeId], [ProductId], [ColorId], [InventoryQuantity]) VALUES (N'f31ac2c9-a8f6-4eaa-90a7-83d4cdf0b581', N'bc08531e-0178-4fee-9ef1-6499d97a402e', N'a54fafaf-f23e-4cf5-b9a3-ff1897c6de12', 15)
INSERT [dbo].[ProductSize] ([SizeId], [ProductId], [ColorId], [InventoryQuantity]) VALUES (N'f31ac2c9-a8f6-4eaa-90a7-83d4cdf0b581', N'9d4eab2c-45e8-4faa-8b86-6a9ec14c7afa', N'08dd28a6-51d3-4ccb-bb07-1a131d1c2752', 15)
INSERT [dbo].[ProductSize] ([SizeId], [ProductId], [ColorId], [InventoryQuantity]) VALUES (N'f31ac2c9-a8f6-4eaa-90a7-83d4cdf0b581', N'00ec72f9-5203-40ae-9e10-7cfbb761e848', N'08dd28a6-51d3-4ccb-bb07-1a131d1c2752', 15)
INSERT [dbo].[ProductSize] ([SizeId], [ProductId], [ColorId], [InventoryQuantity]) VALUES (N'f31ac2c9-a8f6-4eaa-90a7-83d4cdf0b581', N'7c1e4ae5-6ef9-495d-b7e7-ac1ba061dafd', N'ad2e5afc-d266-420b-bbbe-6cff3e5c8ce3', 15)
INSERT [dbo].[ProductSize] ([SizeId], [ProductId], [ColorId], [InventoryQuantity]) VALUES (N'f31ac2c9-a8f6-4eaa-90a7-83d4cdf0b581', N'561d117e-8495-492d-8c95-ec3b6365bbb4', N'8cc670fa-ab25-4d74-a662-56a53a636977', 15)
INSERT [dbo].[ProductSize] ([SizeId], [ProductId], [ColorId], [InventoryQuantity]) VALUES (N'f31ac2c9-a8f6-4eaa-90a7-83d4cdf0b581', N'9b8c4e80-b5ef-4cb2-80c9-f33bba4c681f', N'08dd28a6-51d3-4ccb-bb07-1a131d1c2752', 15)
INSERT [dbo].[ProductSize] ([SizeId], [ProductId], [ColorId], [InventoryQuantity]) VALUES (N'b484db7a-a67c-4e23-99bb-da6705e6af28', N'21fdcb92-1482-486e-ba71-1079d7c038bd', N'f13c60d1-6d9c-418a-9c2b-f02d5515d990', 20)
INSERT [dbo].[ProductSize] ([SizeId], [ProductId], [ColorId], [InventoryQuantity]) VALUES (N'b484db7a-a67c-4e23-99bb-da6705e6af28', N'bc08531e-0178-4fee-9ef1-6499d97a402e', N'a54fafaf-f23e-4cf5-b9a3-ff1897c6de12', 20)
INSERT [dbo].[ProductSize] ([SizeId], [ProductId], [ColorId], [InventoryQuantity]) VALUES (N'b484db7a-a67c-4e23-99bb-da6705e6af28', N'9d4eab2c-45e8-4faa-8b86-6a9ec14c7afa', N'08dd28a6-51d3-4ccb-bb07-1a131d1c2752', 20)
INSERT [dbo].[ProductSize] ([SizeId], [ProductId], [ColorId], [InventoryQuantity]) VALUES (N'b484db7a-a67c-4e23-99bb-da6705e6af28', N'00ec72f9-5203-40ae-9e10-7cfbb761e848', N'08dd28a6-51d3-4ccb-bb07-1a131d1c2752', 20)
INSERT [dbo].[ProductSize] ([SizeId], [ProductId], [ColorId], [InventoryQuantity]) VALUES (N'b484db7a-a67c-4e23-99bb-da6705e6af28', N'7c1e4ae5-6ef9-495d-b7e7-ac1ba061dafd', N'ad2e5afc-d266-420b-bbbe-6cff3e5c8ce3', 20)
INSERT [dbo].[ProductSize] ([SizeId], [ProductId], [ColorId], [InventoryQuantity]) VALUES (N'b484db7a-a67c-4e23-99bb-da6705e6af28', N'561d117e-8495-492d-8c95-ec3b6365bbb4', N'8cc670fa-ab25-4d74-a662-56a53a636977', 20)
INSERT [dbo].[ProductSize] ([SizeId], [ProductId], [ColorId], [InventoryQuantity]) VALUES (N'b484db7a-a67c-4e23-99bb-da6705e6af28', N'9b8c4e80-b5ef-4cb2-80c9-f33bba4c681f', N'08dd28a6-51d3-4ccb-bb07-1a131d1c2752', 20)
