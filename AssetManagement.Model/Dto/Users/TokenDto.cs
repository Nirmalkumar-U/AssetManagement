﻿namespace AssetManagement.Model
{
    public class TokenDto
    {
        public string AccessToken { get; set; }
        public List<ClaimDto> Claims { get; set; }
        public string ExpireIn { get; set; }
    }
}
